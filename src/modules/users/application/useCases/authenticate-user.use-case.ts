import { Either, failure, success } from '@shared/core/errors/either';
import { HashProvider } from '../providers/hash-provider.interface';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import {
  ResourceConflictError,
  ResourceNotFoundError,
} from '@shared/core/errors/generics';
import { AuthProvider } from '@modules/auth/application/providers/auth-provider.interface';

type Response = Either<ResourceNotFoundError | ResourceConflictError, string>;

type AuthenticateData = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepositoryInterface,
    private hashProvider: HashProvider,
    private authProvider: AuthProvider,
  ) {}
  async execute(authenticaData: AuthenticateData): Promise<Response> {
    const { email, password } = authenticaData;
    const user = await this.userRepository.findByEmail(email);

    if (!user) return failure(new ResourceNotFoundError('User not found'));
    const passwordMatch = await this.hashProvider.compare(
      password,
      user.password,
    );
    if (!passwordMatch)
      return failure(new ResourceConflictError('Password not match'));

    return success(
      this.authProvider.generateAuth({
        userId: user.id,
        role: user.role ?? undefined,
      }),
    );
  }
}
