import { Order } from 'src/modules/orders/application/entities/order.entity';
import {
  FindOrderOptions,
  OrderRepositoryInterface,
} from 'src/modules/orders/application/repositories/order-repository.interface';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaOrderMapper } from '../mappers/prisma-order.mapper';
@Injectable()
export class OrderPrismaRepository implements OrderRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  async create(order: Order): Promise<void> {
    const rawOrder = PrismaOrderMapper.toPrisma(order);
    await this.prisma.order.create({
      data: rawOrder,
    });
  }
  async find({ filters }: FindOrderOptions): Promise<Order | undefined> {
    const { id, userId } = filters;
    const order = await this.prisma.order.findFirst({
      where: {
        AND: {
          id,
          userId,
        },
      },
    });
    return order ? PrismaOrderMapper.toDomain(order) : undefined;
  }

  async save(order: Order): Promise<void> {
    const rawOrder = PrismaOrderMapper.toPrisma(order);
    await this.prisma.order.update({
      where: {
        id: order.id,
      },

      data: rawOrder,
    });
  }
}
