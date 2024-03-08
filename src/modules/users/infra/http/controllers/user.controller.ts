import { CreateUserUseCase } from '@modules/users/application/useCases/create-user.use-case';
import { ResourceConflictError } from '@shared/core/errors/generics';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUsertDTO } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  async create(@Body() userBody: CreateUsertDTO, @Res() res: Response) {
    const responseUseCase = await this.createUserUseCase.execute(userBody);
    if (responseUseCase.isFailure()) {
      const error = responseUseCase.value;
      const message = error.message;
      if (error.constructor === ResourceConflictError)
        res.status(400).json({
          status: 'error',
          error: 'code.badRequest',
          message: message,
        });
    }
    res.status(201).send();
  }
}
