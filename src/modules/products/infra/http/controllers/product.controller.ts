import { Controller, Get } from '@nestjs/common';
import { ListAllProductUseCase } from 'src/modules/products/application/useCases/list-all-product.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private listProductUseCase: ListAllProductUseCase) {}
  @Get()
  async listAll() {
    const products = await this.listProductUseCase.execute();
    if (!products.value) return [];
    return products.value.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  }
}
