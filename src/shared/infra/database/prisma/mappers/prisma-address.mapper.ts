import { Address as rawAddress } from '@prisma/client';
import { Address } from '@modules/users/application/entities/address.entity';

export class PrismaAddressMapper {
  static toPrisma(address: Address) {
    return {
      id: address.id,
      district: address.district,
      street: address.street,
      number: address.number,
      reference: address.reference,
      userId: address.userId,
    };
  }

  static toDomain(raw: rawAddress): Address {
    return new Address(
      {
        district: raw.district,
        street: raw.street,
        number: raw.number,
        reference: raw.reference,
        userId: raw.userId,
      },
      raw.id,
    );
  }
}
