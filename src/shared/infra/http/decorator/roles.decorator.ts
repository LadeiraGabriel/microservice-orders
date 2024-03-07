import { SetMetadata } from '@nestjs/common';

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  DELIVERYMAN = 'DELIVERYMAN',
  ALL = 'ALL',
}

export const ROLE_KEY = 'role';
export const Roles = (role: Role) => SetMetadata(ROLE_KEY, role);
