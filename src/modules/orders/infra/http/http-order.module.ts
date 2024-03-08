import { AuthModule } from '@modules/auth/auth.module';
import { CreateOrderUseCase } from '../../application/useCases/create-order.use-case';
import { OrderRepositoryInterface } from '../../application/repositories/order-repository.interface';
import { ProductRepositoryInterface } from '@modules/products/application/repositories/product-repository.interface';
import { AuthGuard } from '@shared/infra/http/middleware/auth.guard';
import { AddressRepositoryInterface } from '@modules/users/application/repositories/address-repository.interface';
import { MessagerDeliveryProviderInterface } from '../../application/providers/messager-delivery-provider.interface';
import { GetStatusOrderUseCase } from '../../application/useCases/get-status-order.use-case';
import { ProviderModule } from '@shared/providers/provider.module';
import { HttpOrderController } from './controllers/http-order.controller';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

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
