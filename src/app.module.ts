import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrdersModule, ProductsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
