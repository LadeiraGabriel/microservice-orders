import { Order } from '@modules/orders/application/entities/order.entity';

export class OrderViewModel {
  static toHttp(order: Order) {
    return {
      id: order.id,
      userId: order.userId,
      productId: order.productId,
      addressId: order.addressId,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      creatAt: order.createdAt,
      updateAt: order.updateAt,
      status: order.status,
    };
  }
}
