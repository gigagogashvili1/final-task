import { Roles } from '@app/common-lib/decorators';
import { AccessTokenGuard, RoleGuard } from '@app/common-lib/guards';
import { UserRole } from '@app/users-lib/enums';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('patients')
export class PatientsController {
  @Roles(UserRole.PATIENT)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get()
  public onlyForPatient() {
    return 'Patient';
  }
}
