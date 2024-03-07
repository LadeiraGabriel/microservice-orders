import { Either, success } from 'src/shared/core/errors/either';
import { ProductRepositoryInterface } from '../repositories/product-repository.interface';
import { Product } from '../entities/product.entity';

type Response = Either<null, Product[]>;

export class ListAllProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}
  async execute(): Promise<Response> {
    const products = await this.productRepository.findAll();
    return success(products);
  }
}
