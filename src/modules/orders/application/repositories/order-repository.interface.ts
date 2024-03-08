import { Order } from '../entities/order.entity';

export type FindOrderOptions = {
  filters: {
    id?: string;
    userId?: string;
    product?: string;
  };
};

export abstract class OrderRepositoryInterface {
  abstract create(order: Order): Promise<void>;
  abstract save(order: Order): Promise<void>;
  abstract find(options: FindOrderOptions): Promise<Order | undefined>;
}
