import { ProductRepositoryInterface } from 'src/modules/products/application/repositories/product-repository.interface';
import { Order } from '../entities/order.entity';
import { OrderRepositoryInterface } from '../repositories/order-repository.interface';
import { Either, failure, success } from 'src/shared/core/errors/either';
import {
  ResourceConflictError,
  ResourceNotFoundError,
} from 'src/shared/core/errors/generics';
import { AddressRepositoryInterface } from 'src/modules/users/application/repositories/address-repository.interface';
import { MessagerDeliveryProviderInterface } from '../providers/messager-delivery-provider.interface';

type CreateOrderData = {
  userId: string;
  productId: string;
  addressId: string;
  quantity: number;
};

type Response = Either<ResourceNotFoundError | ResourceConflictError, null>;
export class CreateOrderUseCase {
  constructor(
    private addressRepository: AddressRepositoryInterface,
    private orderRepository: OrderRepositoryInterface,
    private productRepository: ProductRepositoryInterface,
    private messagerDeliveryProvider: MessagerDeliveryProviderInterface,
  ) {}
  async execute(orderData: CreateOrderData): Promise<Response> {
    const { userId, productId, addressId, quantity } = orderData;
    const addressBelongsToTheUser = await this.addressRepository.find({
      filters: { userId, id: addressId },
    });
    if (!addressBelongsToTheUser)
      return failure(
        new ResourceConflictError('Address does not belong to the user'),
      );
    const product = await this.productRepository.find(productId);
    if (!product)
      return failure(new ResourceNotFoundError('Product not found'));
    const quantityStockIsMinor = product.quantity < quantity;
    if (quantityStockIsMinor)
      return failure(
        new ResourceConflictError('Quantity larger than our stock'),
      );

    const totalPrice = product.price * quantity;

    const order = new Order({
      userId,
      addressId,
      productId,
      quantity,
      totalPrice,
    });
    product.quantity = product.quantity - order.quantity;
    await this.productRepository.save(product);
    await this.orderRepository.create(order);
    await this.messagerDeliveryProvider.sendOrderToDelivery({
      orderId: order.id,
      address: {
        district: addressBelongsToTheUser.district,
        street: addressBelongsToTheUser.street,
        houseNumber: addressBelongsToTheUser.number,
        reference: addressBelongsToTheUser.reference,
      },
      productId: product.id,
      quantityProduct: order.quantity,
      userId: addressBelongsToTheUser.userId,
    });
    return success(null);
  }
}
