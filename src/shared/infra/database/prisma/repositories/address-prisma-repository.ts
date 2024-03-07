import { PrismaService } from '../prisma.service';
import {
  AddressRepositoryInterface,
  FindAddressOptions,
} from 'src/modules/users/application/repositories/address-repository.interface';
import { Address } from 'src/modules/users/application/entities/address.entity';
import { PrismaAddressMapper } from '../mappers/prisma-address.mapper';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AddressPrismaRepository implements AddressRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  async save(address: Address): Promise<void> {
    const raw = PrismaAddressMapper.toPrisma(address);
    await this.prisma.address.create({
      data: raw,
    });
  }

  async find({
    filters = {},
  }: FindAddressOptions): Promise<Address | undefined> {
    const { id, district, street, number, userId } = filters;
    const rawAddress = await this.prisma.address.findFirst({
      where: {
        AND: {
          id,
          district,
          street,
          number,
          userId,
        },
      },
    });

    return rawAddress ? PrismaAddressMapper.toDomain(rawAddress) : undefined;
  }
}
