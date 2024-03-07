import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/infra/database/database.module';
import { ProviderModule } from 'src/shared/providers/provider.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AdminUserController } from './controllers/admin-user.controller';
import { UserController } from './controllers/user.controller';
import { AddressController } from './controllers/address.controller';
import { AuthenticateUserUseCase } from '../../application/useCases/authenticate-user.use-case';
import { UserRepositoryInterface } from '../../application/repositories/user-repository.interface';
import { HashProvider } from '../../application/providers/hash-provider.interface';
import { AuthProvider } from 'src/modules/auth/application/providers/auth-provider.interface';
import { CreateAddressUseCase } from '../../application/useCases/create-address.use-case';
import { AddressRepositoryInterface } from '../../application/repositories/address-repository.interface';
import { CreateUserUseCase } from '../../application/useCases/create-user.use-case';
import { UpdateRoleUserUseCase } from '../../application/useCases/update-role-user.use-case';
import { AuthenticateController } from './controllers/authenticate.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/infra/http/middleware/auth.guard';

@Module({
  imports: [DatabaseModule, ProviderModule, AuthModule],
  controllers: [
    AdminUserController,
    UserController,
    AddressController,
    AuthenticateController,
  ],

  providers: [
    {
      provide: AuthenticateUserUseCase,
      useFactory: (
        userRepository: UserRepositoryInterface,
        hashProvider: HashProvider,
        authProvider: AuthProvider,
      ) => {
        return new AuthenticateUserUseCase(
          userRepository,
          hashProvider,
          authProvider,
        );
      },
      inject: [UserRepositoryInterface, HashProvider, AuthProvider],
    },

    {
      provide: CreateAddressUseCase,
      useFactory: (
        userRepository: UserRepositoryInterface,
        addreassRepository: AddressRepositoryInterface,
      ) => {
        return new CreateAddressUseCase(userRepository, addreassRepository);
      },
      inject: [UserRepositoryInterface, AddressRepositoryInterface],
    },

    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepositoryInterface,
        hashProvider: HashProvider,
      ) => {
        return new CreateUserUseCase(userRepository, hashProvider);
      },
      inject: [UserRepositoryInterface, HashProvider],
    },

    {
      provide: UpdateRoleUserUseCase,
      useFactory: (userRepository: UserRepositoryInterface) => {
        return new UpdateRoleUserUseCase(userRepository);
      },
      inject: [UserRepositoryInterface],
    },

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HttpUserModule {}
