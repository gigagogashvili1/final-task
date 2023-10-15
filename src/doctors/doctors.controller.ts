import { Roles } from '@app/common-lib/decorators';
import { AccessTokenGuard, RoleGuard } from '@app/common-lib/guards';
import { RequestWithUser } from '@app/common-lib/interfaces';
import { UpdateDoctorDto } from '@app/users-lib/dtos';
import { User } from '@app/users-lib/entities';
import { UserRole } from '@app/users-lib/enums';
import { DoctorsService } from '@app/users-lib/services/doctors.service';
import { Body, Controller, Param, Put, Req, UseGuards } from '@nestjs/common';

@Controller('doctors')
export class DoctorsController {
  public constructor(private readonly doctorsService: DoctorsService) {}

  @Roles(UserRole.DOCTOR)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put('update/:id')
  public async updatedoctor(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Req() request: RequestWithUser<User>,
  ) {
    return await this.doctorsService.updateDoctor(id, updateDoctorDto, request.user);
  }
}
