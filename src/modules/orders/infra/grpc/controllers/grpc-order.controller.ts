import { UpdateStatusOrderToOnWayUseCase } from '@modules/orders/application/useCases/update-status-order-to-on-the-way.use-case';
import { UpdateStatusOrderToFinishUseCase } from '@modules/orders/application/useCases/update-status-order-to-finish.use-case';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { StatusOrderDto } from '../dto/status-order.dto';
import { Controller } from '@nestjs/common';

@Controller()
export class GRpcOrderController {
  constructor(
    private updateStatusOrderToOnWayUseCase: UpdateStatusOrderToOnWayUseCase,
    private updateStatusOrderFinishUseCase: UpdateStatusOrderToFinishUseCase,
  ) {}
  @GrpcMethod('OrderService', 'SaveOnTheWayStatus')
  async saveOnTheWayStatus(@Payload() orderData: StatusOrderDto) {
    const { orderId } = orderData;
    await this.updateStatusOrderToOnWayUseCase.execute({
      orderId,
    });
  }
  @GrpcMethod('OrderService', 'SaveFinishStatus')
  async saveFinishStatus(@Payload() orderData: StatusOrderDto) {
    const { orderId } = orderData;
    await this.updateStatusOrderFinishUseCase.execute({
      orderId,
    });
  }
}
