import { Module } from '@nestjs/common';
import { HttpProductsModule } from './infra/http/http-products.module';

@Module({
  imports: [HttpProductsModule],
})
export class ProductsModule {}
