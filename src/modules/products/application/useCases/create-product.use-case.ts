import { Either, success } from '@shared/core/errors/either';
import { ProductRepositoryInterface } from '../repositories/product-repository.interface';
import { Product } from '../entities/product.entity';

type ProductData = {
  name: string;
  price: number;
  quantity: number;
};

type Response = Either<null, null>;

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}
  async execute(productData: ProductData): Promise<Response> {
    const product = new Product(productData);
    await this.productRepository.create(product);
    return success(null);
  }
}
