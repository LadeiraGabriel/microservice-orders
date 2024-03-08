import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticateUserUseCase } from 'src/modules/users/application/useCases/authenticate-user.use-case';
import { AuthenticateHttpBodyDTO } from '../dto/authenticate.dto';
import { UnauthorizedError } from 'src/shared/core/errors/generics';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user/auth')
export class AuthenticateController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async authenticate(
    @Body() body: AuthenticateHttpBodyDTO,
    @Res() res: Response,
  ) {
    const { email, password } = body;

    const responseUseCase = await this.authenticateUserUseCase.execute({
      email,
      password,
    });
    if (responseUseCase.isSuccess()) {
      return res.status(200).json({ token: responseUseCase.value });
    }
    const error = responseUseCase.value;
    const message = error.message;
    if (error.constructor === UnauthorizedError)
      return res.status(401).json({
        status: 'error',
        error: 'code.unauthorized',
        message: message,
      });
  }
}
