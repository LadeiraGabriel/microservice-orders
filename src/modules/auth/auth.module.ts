import { VerifyAuthorizationUseCase } from './application/useCases/verify-authorization.use-case';
import { ProviderModule } from '@shared/providers/provider.module';
import { AuthProvider } from './application/providers/auth-provider.interface';
import { Module } from '@nestjs/common';

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
