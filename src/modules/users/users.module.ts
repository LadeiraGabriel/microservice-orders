import { Module } from '@nestjs/common';
import { HttpUserModule } from './infra/http/http-user.module';

@Module({
  imports: [HttpUserModule],
})
export class UsersModule {}
