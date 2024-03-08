import { Controller, Get } from '@nestjs/common';
import { ListAllProductUseCase } from '@modules/products/application/useCases/list-all-product.use-case';
import { ApiTags } from '@nestjs/swagger';
import { ProductViewModel } from '../view-models/product-view-model';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private listProductUseCase: ListAllProductUseCase) {}
  @Get()
  async listAll() {
    const reponse = await this.listProductUseCase.execute();
    const products = reponse.value ?? [];
    return {
      products: products.map(ProductViewModel.toHttp),
    };
  }
}
