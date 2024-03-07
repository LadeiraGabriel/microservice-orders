import { Module } from '@nestjs/common';
import { HttpOrdersModule } from './infra/http/http-order.module';
import { GRpcOrdersModule } from './infra/grpc/grpc-order.module';
@Module({
  imports: [HttpOrdersModule, GRpcOrdersModule],
})
export class OrdersModule {}
