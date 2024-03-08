import { Either, failure, success } from '@shared/core/errors/either';
import { ResourceConflictError } from '@shared/core/errors/generics';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { HashProvider } from '../providers/hash-provider.interface';

type Response = Either<ResourceConflictError, null>;

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hashProvider: HashProvider,
  ) {}
  async execute(data: CreateUserData): Promise<Response> {
    const { name, email, password, passwordConfirmation } = data;

    const findUserByEmail = await this.userRepository.findByEmail(email);
    if (findUserByEmail)
      return failure(new ResourceConflictError('Email in used'));
    if (password !== passwordConfirmation)
      return failure(
        new ResourceConflictError('password not match password confirmation'),
      );

    const hashPassword = await this.hashProvider.generate(password);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await this.userRepository.save(user);
    return success(null);
  }
}
