import { Body, Controller, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { UpdateRoleUserDTO } from '../dto/update-role-user.dto';
import { UpdateRoleUserUseCase } from 'src/modules/users/application/useCases/update-role-user.use-case';
import { Role, Roles } from 'src/shared/infra/http/decorator/roles.decorator';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('admin/role')
@ApiSecurity('bearerAuth')
@Roles(Role.ADMIN)
export class AdminUserController {
  constructor(private updateRoleUserUseCase: UpdateRoleUserUseCase) {}
  @Patch('update')
  async update(
    @Body() updateUserIdData: UpdateRoleUserDTO,
    @Res() res: Response,
  ) {
    await this.updateRoleUserUseCase.execute(updateUserIdData);
    res.send();
  }
}
