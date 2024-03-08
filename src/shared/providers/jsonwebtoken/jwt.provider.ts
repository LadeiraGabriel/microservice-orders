import {
  AuthProvider,
  AuthorizationProps,
} from '@modules/auth/application/providers/auth-provider.interface';
import authConfig from '@config/auth';
import { JwtPayload, sign, decode } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

interface IPayload extends AuthorizationProps, JwtPayload {}
@Injectable()
export class JwtProvider implements AuthProvider {
  private defaultExpiresIn: string;
  private secret;

  constructor() {
    const { secret, expiresIn } = authConfig.jwt;
    this.defaultExpiresIn = expiresIn;
    this.secret = secret;
  }
  public generateAuth(data: AuthorizationProps): string {
    const { userId, role } = data;
    const token = sign({ userId, role }, this.secret, {
      subject: userId,
      expiresIn: '1d',
    });

    return token;
  }

  public verifyCredentials(token: string): AuthorizationProps | undefined {
    const decoded = decode(token);
    if (!decoded) return undefined;
    const { userId, role } = decoded as IPayload;
    return { userId, role };
  }
}
