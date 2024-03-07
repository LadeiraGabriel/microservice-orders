import { RoleType, User } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract save(user: User): Promise<void>;
  abstract findById(id: string): Promise<User | undefined>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract update(id: string, role: RoleType): Promise<void>;
}
