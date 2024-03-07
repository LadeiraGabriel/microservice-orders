import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAddresstDTO } from '../dto/create-address.dto';
import { CreateAddressUseCase } from 'src/modules/users/application/useCases/create-address.use-case';
import { Role, Roles } from 'src/shared/infra/http/decorator/roles.decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiSecurity('bearerAuth')
@Controller('user/address')
@Roles(Role.CUSTOMER)
export class AddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}
  @Post()
  async create(
    @Body() addressBody: CreateAddresstDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { district, street, number, reference } = addressBody;

    const { id } = req.user;
    await this.createAddressUseCase.execute({
      district,
      street,
      number,
      reference,
      userId: id,
    });
    res.status(201).send();
  }
}
