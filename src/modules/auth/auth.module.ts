import { Module } from '@nestjs/common';
import { ProviderModule } from 'src/shared/providers/provider.module';
import { VerifyAuthorizationUseCase } from './application/useCases/verify-authorization.use-case';
import { AuthProvider } from './application/providers/auth-provider.interface';

@Module({
  imports: [ProviderModule],
  providers: [
    {
      provide: VerifyAuthorizationUseCase,
      useFactory: (authProvider: AuthProvider) => {
        return new VerifyAuthorizationUseCase(authProvider);
      },
      inject: [AuthProvider],
    },
  ],
  exports: [VerifyAuthorizationUseCase],
})
export class AuthModule {}
