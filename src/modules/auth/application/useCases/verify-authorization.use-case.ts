import { Either, failure, success } from 'src/shared/core/errors/either';
import { UnauthorizedError } from 'src/shared/core/errors/generics';
import { AuthProvider } from '../providers/auth-provider.interface';

interface IVerifyAuthorizationUseCaseRequest {
  token: string;
  authorizedRole: string;
}

interface AuthorizationUser {
  userId: string;
  role: string;
}

type Response = Either<UnauthorizedError, AuthorizationUser>;

class VerifyAuthorizationUseCase {
  constructor(private authProvider: AuthProvider) {}

  public execute({
    token,
    authorizedRole,
  }: IVerifyAuthorizationUseCaseRequest): Response {
    const auth = this.authProvider.verifyCredentials(token);
    if (!auth) return failure(new UnauthorizedError('Invalid JWT token'));
    if (auth.role === 'ALL') {
      return success({
        userId: auth.userId,
        role: auth.role,
      });
    }
    const isAuthorized = authorizedRole === auth.role;
    if (!isAuthorized) return failure(new UnauthorizedError());
    return success({
      userId: auth.userId,
      role: auth.role,
    });
  }
}

export { VerifyAuthorizationUseCase };
