import { VerifyAuthorizationUseCase } from '@modules/auth/application/useCases/verify-authorization.use-case';
import { UnauthorizedError } from '@shared/core/errors/generics';
import { ROLE_KEY } from '../decorator/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    public readonly verifyAuthorizationUseCase: VerifyAuthorizationUseCase,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorizedRole = this.reflector.getAllAndOverride<string>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!authorizedRole) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({
        status: 'error',
        error: 'code.token_missing',
        message: 'JWT token is missing',
      });
      return false;
    }

    const [, token] = authHeader.split(' ') as string;
    const response = this.verifyAuthorizationUseCase.execute({
      token,
      authorizedRole,
    });
    if (response.isFailure()) {
      const error = response.value;
      const message = error.message;
      if (error.constructor === UnauthorizedError)
        res.status(403).json({
          status: 'error',
          error: 'code.forbidden',
          message: message,
        });
      return false;
    } else {
      const { userId, role } = response.value;
      req.user = {
        id: userId,
        role: role,
      };
    }

    return true;
  }
}
