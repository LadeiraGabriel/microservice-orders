import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { OrderRepositoryInterface } from '../../application/repositories/order-repository.interface';
import { GRpcOrderController } from './controllers/grpc-order.controller';
import { UpdateStatusOrderToOnWayUseCase } from '../../application/useCases/update-status-order-to-on-the-way.use-case';
import { UpdateStatusOrderToFinishUseCase } from '../../application/useCases/update-status-order-to-finish.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [GRpcOrderController],
  providers: [
    {
      provide: UpdateStatusOrderToOnWayUseCase,

      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateStatusOrderToOnWayUseCase(orderRepository);
      },
      inject: [OrderRepositoryInterface],
    },

    {
      provide: UpdateStatusOrderToFinishUseCase,

      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new UpdateStatusOrderToFinishUseCase(orderRepository);
      },
      inject: [OrderRepositoryInterface],
    },
  ],
})
export class GRpcOrdersModule {}
