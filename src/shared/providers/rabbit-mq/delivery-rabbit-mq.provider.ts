import {
  MessagerDeliveryProviderInterface,
  SendOrderToDelivery,
} from '@modules/orders/application/providers/messager-delivery-provider.interface';
import { Client, ClientRMQ, Transport } from '@nestjs/microservices';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DeliveryRabbitMQProvider
  implements OnModuleInit, OnModuleDestroy, MessagerDeliveryProviderInterface
{
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'orders_queue',
      queueOptions: {
        durable: true,
      },
    },
  })
  clientRMQ: ClientRMQ;

  onModuleInit() {
    this.clientRMQ.connect();
  }

  onModuleDestroy() {
    this.clientRMQ.close();
  }
  async sendOrderToDelivery(payload: SendOrderToDelivery): Promise<void> {
    await this.clientRMQ.emit('send_order', payload);
  }
}
