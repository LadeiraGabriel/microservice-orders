import { User as rawUser } from '@prisma/client';
import { User } from 'src/modules/users/application/entities/user.entity';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }

  static toDomain(raw: rawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role,
      },
      raw.id,
    );
  }
}
