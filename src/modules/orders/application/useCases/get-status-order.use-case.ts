import { Either, failure, success } from 'src/shared/core/errors/either';
import { ResourceNotFoundError } from 'src/shared/core/errors/generics';
import { OrderRepositoryInterface } from '../repositories/order-repository.interface';

type OrderDate = {
  orderId: string;
};

type Response = Either<ResourceNotFoundError, string>;

export class GetStatusOrderUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}
  async execute({ orderId }: OrderDate): Promise<Response> {
    const order = await this.orderRepository.find({
      filters: {
        id: orderId,
      },
    });
    if (!order) return failure(new ResourceNotFoundError('Order not found'));

    if (!order.status) return success('Order is being prepared');

    return success(order.status);
  }
}
