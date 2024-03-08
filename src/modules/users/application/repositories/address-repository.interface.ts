import { Address } from '../entities/address.entity';

export type FindAddressOptions = {
  filters: {
    id?: string;
    district?: string;
    street?: string;
    number?: number;
    userId?: string;
  };
};

export abstract class AddressRepositoryInterface {
  abstract save(address: Address): Promise<void>;
  abstract find(options: FindAddressOptions): Promise<Address | undefined>;
  abstract findMany(options: FindAddressOptions): Promise<Address[]>;
}
