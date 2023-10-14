import { Roles } from '@app/common-lib/decorators';
import { UserRole } from '@app/users-lib/enums';
import { Controller, Get } from '@nestjs/common';

@Controller('doctors')
export class DoctorsController {
  @Roles(UserRole.DOCTOR)
  @Get()
  public onlyForDoctor() {
    return 'doctor';
  }
}
