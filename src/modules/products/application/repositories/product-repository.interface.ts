import { Product } from '../entities/product.entity';

export type FindManyOptions = {
  filters?: {
    id?: string;
    userId?: string;
    productId?: string;
  };
};

export abstract class ProductRepositoryInterface {
  abstract create(product: Product): Promise<void>;
  abstract find(id: string): Promise<Product | undefined>;
  abstract findAll(): Promise<Product[]>;
  abstract save(product: Product): Promise<void>;
}
