import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrderPrismaRepository } from './prisma/repositories/order-prisma-repository';
import { ProductPrismaRepository } from './prisma/repositories/product-prisma-repository';
import { OrderRepositoryInterface } from 'src/modules/orders/application/repositories/order-repository.interface';
import { ProductRepositoryInterface } from 'src/modules/products/application/repositories/product-repository.interface';
import { UserRepositoryInterface } from 'src/modules/users/application/repositories/user-repository.interface';
import { UserPrismaRepository } from './prisma/repositories/user-prisma-repository';
import { AddressRepositoryInterface } from 'src/modules/users/application/repositories/address-repository.interface';
import { AddressPrismaRepository } from './prisma/repositories/address-prisma-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: OrderRepositoryInterface,
      useClass: OrderPrismaRepository,
    },
    {
      provide: ProductRepositoryInterface,
      useClass: ProductPrismaRepository,
    },
    {
      provide: UserRepositoryInterface,
      useClass: UserPrismaRepository,
    },
    {
      provide: AddressRepositoryInterface,
      useClass: AddressPrismaRepository,
    },
  ],
  exports: [
    OrderRepositoryInterface,
    ProductRepositoryInterface,
    UserRepositoryInterface,
    AddressRepositoryInterface,
  ],
})
export class DatabaseModule {}
