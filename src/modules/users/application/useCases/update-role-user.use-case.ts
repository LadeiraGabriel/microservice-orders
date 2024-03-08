import { Either, failure, success } from '@shared/core/errors/either';
import { ResourceConflictError } from '@shared/core/errors/generics';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { RoleType } from '../entities/user.entity';

type Response = Either<ResourceConflictError, null>;

type UpdateRoleUserData = {
  userId: string;
  role: RoleType;
};

export class UpdateRoleUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute({ userId, role }: UpdateRoleUserData): Promise<Response> {
    const user = await this.userRepository.findById(userId);
    if (!user) return failure(new ResourceConflictError('User not found'));

    await this.userRepository.update(userId, role);

    return success(null);
  }
}
