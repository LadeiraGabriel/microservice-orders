import { Either, success } from '@shared/core/errors/either';
import { Address } from '../entities/address.entity';
import { AddressRepositoryInterface } from '../repositories/address-repository.interface';

type Response = Either<null, Address[]>;

type ListAddressData = {
  userId: string;
};

export class ListAddressByUserUseCase {
  constructor(private addreassRepository: AddressRepositoryInterface) {}
  async execute({ userId }: ListAddressData): Promise<Response> {
    const addressByUser = await this.addreassRepository.findMany({
      filters: {
        userId,
      },
    });
    return success(addressByUser);
  }
}
