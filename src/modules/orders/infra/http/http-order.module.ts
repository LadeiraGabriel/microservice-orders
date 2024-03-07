import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { HttpOrderController } from './controllers/http-order.controller';
import { ProviderModule } from 'src/shared/providers/provider.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CreateOrderUseCase } from '../../application/useCases/create-order.use-case';
import { OrderRepositoryInterface } from '../../application/repositories/order-repository.interface';
import { ProductRepositoryInterface } from 'src/modules/products/application/repositories/product-repository.interface';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/infra/http/middleware/auth.guard';
import { AddressRepositoryInterface } from 'src/modules/users/application/repositories/address-repository.interface';
import { MessagerDeliveryProviderInterface } from '../../application/providers/messager-delivery-provider.interface';
import { GetStatusOrderUseCase } from '../../application/useCases/get-status-order.use-case';

@Module({
  imports: [DatabaseModule, ProviderModule, AuthModule],
  controllers: [HttpOrderController],
  providers: [
    {
      provide: CreateOrderUseCase,

      useFactory: (
        addresRepository: AddressRepositoryInterface,
        orderRepository: OrderRepositoryInterface,
        productRepository: ProductRepositoryInterface,
        messagerDeliveryProvider: MessagerDeliveryProviderInterface,
      ) => {
        return new CreateOrderUseCase(
          addresRepository,
          orderRepository,
          productRepository,
          messagerDeliveryProvider,
        );
      },
      inject: [
        AddressRepositoryInterface,
        OrderRepositoryInterface,
        ProductRepositoryInterface,
        MessagerDeliveryProviderInterface,
      ],
    },

    {
      provide: GetStatusOrderUseCase,

      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetStatusOrderUseCase(orderRepository);
      },
      inject: [OrderRepositoryInterface],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpOrdersModule {}
