import { AddressRepositoryInterface } from '@modules/users/application/repositories/address-repository.interface';
import { OrderRepositoryInterface } from '@modules/orders/application/repositories/order-repository.interface';
import { ProductRepositoryInterface } from '@modules/products/application/repositories/product-repository.interface';
import { UserRepositoryInterface } from '@modules/users/application/repositories/user-repository.interface';
import { PrismaService } from './prisma/prisma.service';
import { OrderPrismaRepository } from './prisma/repositories/order-prisma-repository';
import { ProductPrismaRepository } from './prisma/repositories/product-prisma-repository';
import { UserPrismaRepository } from './prisma/repositories/user-prisma-repository';
import { AddressPrismaRepository } from './prisma/repositories/address-prisma-repository';
import { Module } from '@nestjs/common';

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
