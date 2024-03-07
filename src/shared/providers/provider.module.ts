import { AuthProvider } from 'src/modules/auth/application/providers/auth-provider.interface';
import { JwtProvider } from './jsonwebtoken/jwt.provider';
import { HashProvider } from 'src/modules/users/application/providers/hash-provider.interface';
import { BcryptHashProvider } from './bcrypt/bcrypt.provider';
import { Module } from '@nestjs/common';
import { MessagerDeliveryProviderInterface } from 'src/modules/orders/application/providers/messager-delivery-provider.interface';
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
