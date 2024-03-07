import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { AdminProductController } from './controllers/admin-product.controller';
import { ProductController } from './controllers/product.controller';
import { CreateProductUseCase } from '../../application/useCases/create-product.use-case';
import { ProductRepositoryInterface } from '../../application/repositories/product-repository.interface';
import { ListAllProductUseCase } from '../../application/useCases/list-all-product.use-case';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/infra/http/middleware/auth.guard';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AdminProductController, ProductController],

  providers: [
    {
      provide: CreateProductUseCase,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new CreateProductUseCase(productRepository);
      },
      inject: [ProductRepositoryInterface],
    },

    {
      provide: ListAllProductUseCase,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ListAllProductUseCase(productRepository);
      },
      inject: [ProductRepositoryInterface],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpProductsModule {}
