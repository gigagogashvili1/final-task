import { AuthLibService } from '@app/auth-lib';
import { CreateUserDto } from '@app/auth-lib/dtos/create-user.dto';
import { CreateUserValidationPipe } from '@app/auth-lib/pipes/create-user-validation.pipe';
import { AccessTokenGuard, LocalGuard } from '@app/common-lib/guards';
import { RequestWithUser } from '@app/common-lib/interfaces';
import { User } from '@app/users-lib/entities';
import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UsePipes } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authLibService: AuthLibService) {}

  @HttpCode(201)
  @UsePipes(new CreateUserValidationPipe())
  @Post('sign-up')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authLibService.signUp(createUserDto);
  }

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('sign-in')
  public async signIn(@Req() request: RequestWithUser<User>) {
    return await this.authLibService.signin(request);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me')
  public async getCurrentUser(@Req() request: RequestWithUser<User>) {
    return request.user;
  }
}
