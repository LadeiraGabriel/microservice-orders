import { Either, success } from '@shared/core/errors/either';
import { OrderRepositoryInterface } from '../repositories/order-repository.interface';
import { Order } from '../entities/order.entity';

type OrderDate = {
  userId: string;
};

type Response = Either<null, Order[]>;

export class ListOrdersByUserUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) {}
  async execute({ userId }: OrderDate): Promise<Response> {
    const orders = await this.orderRepository.findMany({
      filters: {
        userId,
      },
    });

    return success(orders);
  }
}
