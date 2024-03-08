import { CreateOrderUseCase } from '@modules/orders/application/useCases/create-order.use-case';
import { Role, Roles } from '@shared/infra/http/decorator/roles.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import {
  ResourceConflictError,
  ResourceNotFoundError,
} from '@shared/core/errors/generics';
import { Request, Response } from 'express';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ListOrdersByUserUseCase } from '@modules/orders/application/useCases/list-orders-by-user.use-case';
import { OrderViewModel } from '../view-models/order.view-model';

@ApiTags('Orders')
@Controller('order')
@ApiSecurity('bearerAuth')
@Roles(Role.CUSTOMER)
export class HttpOrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private listOrderByUserUseCase: ListOrdersByUserUseCase,
  ) {}
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiConflictResponse({ description: 'Conflict.' })
  async create(
    @Body() data: CreateOrderDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { productId, addressId, quantity } = data;
    const { id } = req.user;
    const responseUseCase = await this.createOrderUseCase.execute({
      userId: id,
      productId,
      addressId,
      quantity,
    });

    if (responseUseCase.isFailure()) {
      const error = responseUseCase.value;
      const message = error.message;
      if (error.constructor === ResourceNotFoundError)
        res.status(404).json({
          status: 'error',
          error: 'code.not_found',
          message: message,
        });
      if (error.constructor === ResourceConflictError)
        res.status(409).json({
          status: 'error',
          error: 'code.conflict',
          message: message,
        });
    }
    res.status(201).send();
  }

  @ApiResponse({
    status: 200,
  })
  @Get()
  async listOrders(@Req() req: Request, @Res() res: Response) {
    const { id } = req.user;
    const responseUseCase = await this.listOrderByUserUseCase.execute({
      userId: id,
    });

    res.json({
      orders: responseUseCase.value?.map(OrderViewModel.toHttp),
    });
  }
}
