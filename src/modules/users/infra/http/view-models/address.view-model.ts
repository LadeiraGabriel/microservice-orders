import { Address } from '@modules/users/application/entities/address.entity';

export class AddressViewModel {
  static toHttp(address: Address) {
    return {
      id: address.id,
      district: address.district,
      street: address.street,
      number: address.number,
      reference: address.reference,
    };
  }
}
