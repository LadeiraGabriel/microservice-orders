import { Either, failure, success } from 'src/shared/core/errors/either';
import {
  ResourceConflictError,
  ResourceNotFoundError,
} from 'src/shared/core/errors/generics';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { Address } from '../entities/address.entity';
import { AddressRepositoryInterface } from '../repositories/address-repository.interface';

type Response = Either<ResourceNotFoundError, null>;

type CreateAddressData = {
  userId: string;
  district: string;
  street: string;
  number: number;
  reference?: string;
};

export class CreateAddressUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private addreassRepository: AddressRepositoryInterface,
  ) {}
  async execute(data: CreateAddressData): Promise<Response> {
    const { userId, district, street, number } = data;
    const reference = data.reference ?? null;
    const findUserById = await this.userRepository.findById(userId);
    if (!findUserById)
      return failure(new ResourceNotFoundError('User not found'));

    const findDistrictStreetAndNumberByUser =
      await this.addreassRepository.find({
        filters: {
          userId,
          district,
          street,
          number,
        },
      });

    if (findDistrictStreetAndNumberByUser)
      return failure(
        new ResourceConflictError('Address Already for this user'),
      );

    const address = new Address({
      district,
      street,
      number,
      userId,
      reference,
    });

    await this.addreassRepository.save(address);
    return success(null);
  }
}
