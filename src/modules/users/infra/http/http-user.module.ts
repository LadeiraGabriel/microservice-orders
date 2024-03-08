import { AuthModule } from '@modules/auth/auth.module';
import { AuthProvider } from '@modules/auth/application/providers/auth-provider.interface';
import { AuthenticateUserUseCase } from '@modules/users/application/useCases/authenticate-user.use-case';
import { UserRepositoryInterface } from '@modules/users/application/repositories/user-repository.interface';
import { HashProvider } from '@modules/users/application/providers/hash-provider.interface';
import { UpdateRoleUserUseCase } from '@modules/users/application/useCases/update-role-user.use-case';
import { CreateAddressUseCase } from '@modules/users/application/useCases/create-address.use-case';
import { CreateUserUseCase } from '@modules/users/application/useCases/create-user.use-case';
import { AddressRepositoryInterface } from '@modules/users/application/repositories/address-repository.interface';
import { ProviderModule } from '@shared/providers/provider.module';
import { DatabaseModule } from '@shared/infra/database/database.module';
import { AuthGuard } from '@shared/infra/http/middleware/auth.guard';
import { AddressController } from './controllers/address.controller';
import { UserController } from './controllers/user.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { AdminUserController } from './controllers/admin-user.controller';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ListAddressByUserUseCase } from '@modules/users/application/useCases/list-address-by-user';

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
      provide: ListAddressByUserUseCase,
      useFactory: (addreassRepository: AddressRepositoryInterface) => {
        return new ListAddressByUserUseCase(addreassRepository);
      },
      inject: [AddressRepositoryInterface],
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
