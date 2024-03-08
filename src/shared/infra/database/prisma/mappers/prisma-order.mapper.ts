import { Order as rawOrder } from '@prisma/client';
import { Order } from '@modules/orders/application/entities/order.entity';

type Status = 'finish' | 'onTheWay' | null;

export class PrismaOrderMapper {
  static toPrisma(order: Order) {
    return {
      id: order.id,
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      addressId: order.addressId,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      status:
        order.status === 'on the way' ? 'onTheWay' : (order.status as Status),
    };
  }

  static toDomain(raw: rawOrder): Order {
    return new Order(
      {
        userId: raw.userId,
        productId: raw.productId,
        addressId: raw.addressId,
        quantity: raw.quantity,
        totalPrice: raw.totalPrice,
        createdAt: raw.createdAt,
        status: raw.status === 'onTheWay' ? 'on the way' : raw.status,
      },
      raw.id,
    );
  }
}
