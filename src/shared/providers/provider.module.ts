import { MessagerDeliveryProviderInterface } from '@modules/orders/application/providers/messager-delivery-provider.interface';
import { AuthProvider } from '@modules/auth/application/providers/auth-provider.interface';
import { HashProvider } from '@modules/users/application/providers/hash-provider.interface';
import { JwtProvider } from './jsonwebtoken/jwt.provider';
import { BcryptHashProvider } from './bcrypt/bcrypt.provider';
import { Module } from '@nestjs/common';
import { DeliveryRabbitMQProvider } from './rabbit-mq/delivery-rabbit-mq.provider';

@Module({
  providers: [
    {
      provide: MessagerDeliveryProviderInterface,
      useClass: DeliveryRabbitMQProvider,
    },
    {
      provide: AuthProvider,
      useClass: JwtProvider,
    },
    {
      provide: HashProvider,
      useClass: BcryptHashProvider,
    },
  ],
  exports: [AuthProvider, HashProvider, MessagerDeliveryProviderInterface],
})
export class ProviderModule {}
