import { Either, failure, success } from '@shared/core/errors/either';
import { OrderRepositoryInterface } from '../repositories/order-repository.interface';
import {
  ResourceConflictError,
  ResourceNotFoundError,
} from 'src/shared/core/errors/generics';

type OrderDate = {
  orderId: string;
};

type Response = Either<ResourceNotFoundError, null>;

export class UpdateStatusOrderToFinishUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}
  async execute(orderDate: OrderDate): Promise<Response> {
    const { orderId } = orderDate;
    const order = await this.orderRepository.find({
      filters: {
        id: orderId,
      },
    });
    if (!order) return failure(new ResourceNotFoundError('Order not found'));

    if (!order.status || order.status === 'finish')
      return failure(
        new ResourceConflictError('this order can not be finished'),
      );

    order.status = 'finish';
    order.updateAt = new Date();
    await this.orderRepository.save(order);

    return success(null);
  }
}
