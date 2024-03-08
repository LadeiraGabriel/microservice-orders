import {
  RoleType,
  User,
} from '@modules/users/application/entities/user.entity';
import { UserRepositoryInterface } from '@modules/users/application/repositories/user-repository.interface';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserPrismaRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  async save(user: User): Promise<void> {
    const userToPrisma = PrismaUserMapper.toPrisma(user);
    await this.prisma.user.create({
      data: userToPrisma,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const userRepo = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (userRepo) return PrismaUserMapper.toDomain(userRepo);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const userRepo = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!userRepo) return undefined;
    return PrismaUserMapper.toDomain(userRepo);
  }

  async update(id: string, role: RoleType): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
  }
}
