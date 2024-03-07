import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { CreateProductUseCase } from 'src/modules/products/application/useCases/create-product.use-case';
import { Response } from 'express';
import { Role, Roles } from 'src/shared/infra/http/decorator/roles.decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@ApiSecurity('bearerAuth')
@Controller('products')
@Roles(Role.ADMIN)
export class AdminProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}
  @Post()
  async create(@Body() productBody: CreateProductDTO, @Res() res: Response) {
    await this.createProductUseCase.execute(productBody);
    res.status(201).send();
  }
}
