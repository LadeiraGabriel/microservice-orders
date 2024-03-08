import { CreateAddressUseCase } from '@modules/users/application/useCases/create-address.use-case';
import { Role, Roles } from '@shared/infra/http/decorator/roles.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateAddresstDTO } from '../dto/create-address.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ListAddressByUserUseCase } from '@modules/users/application/useCases/list-address-by-user';
import { AddressViewModel } from '../view-models/address.view-model';

@ApiTags('Users')
@ApiSecurity('bearerAuth')
@Controller('user/address')
@Roles(Role.CUSTOMER)
export class AddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase,
    private listAddressByUserUseCase: ListAddressByUserUseCase,
  ) {}
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

  @Get()
  async listAddress(@Req() req: Request, @Res() res: Response) {
    const { id } = req.user;
    const useCaseResponse = await this.listAddressByUserUseCase.execute({
      userId: id,
    });
    const address = useCaseResponse.value?.map(AddressViewModel.toHttp);
    res.json({
      address,
    });
  }
}
