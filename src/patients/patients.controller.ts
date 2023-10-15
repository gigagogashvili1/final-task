import { Roles } from '@app/common-lib/decorators';
import { AccessTokenGuard, RoleGuard } from '@app/common-lib/guards';
import { RequestWithUser } from '@app/common-lib/interfaces';
import { UpdatePatientDto } from '@app/users-lib/dtos';
import { User } from '@app/users-lib/entities';
import { UserRole } from '@app/users-lib/enums';
import { PatientsService } from '@app/users-lib/services/patients.service';
import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller('patients')
export class PatientsController {
  public constructor(private readonly patientsService: PatientsService) {}

  @Roles(UserRole.PATIENT)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put('update/:id')
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  public updatePatient(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
    @Req() request: RequestWithUser<User>,
  ) {
    return this.patientsService.updatePatient(id, updatePatientDto, request.user);
  }

  @Roles(UserRole.PATIENT)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get('suggested-doctors')
  public onlyForPatient(@Req() request: RequestWithUser<User>) {
    return this.patientsService.getSuggestedDoctors(request.user);
  }
}
