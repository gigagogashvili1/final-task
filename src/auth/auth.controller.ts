import { AuthLibService } from '@app/auth-lib';
import { CreateUserDto } from '@app/auth-lib/dtos/create-user.dto';
import { CreateUserValidationPipe } from '@app/auth-lib/pipes/create-user-validation.pipe';
import { AccessTokenGuard, LocalGuard, RefreshTokenGuard } from '@app/common-lib/guards';
import { RequestWithUser } from '@app/common-lib/interfaces';
import { User } from '@app/users-lib/entities';
import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authLibService: AuthLibService) {}

  @HttpCode(201)
  @UsePipes(new CreateUserValidationPipe())
  @Post('sign-up')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  public signUp(@Body() createUserDto: CreateUserDto) {
    return this.authLibService.signUp(createUserDto);
  }

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('sign-in')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  public signIn(@Req() request: RequestWithUser<User>) {
    return this.authLibService.signIn(request);
  }

  @HttpCode(200)
  @UseGuards(AccessTokenGuard)
  @Get('me')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  public getCurrentUser(@Req() request: RequestWithUser<User>) {
    return request.user;
  }

  @UseGuards(AccessTokenGuard)
  @Post('sign-out')
  public signOut(@Req() request: RequestWithUser<User>) {
    return this.authLibService.signOut(request);
  }

  @HttpCode(200)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  @Throttle({ default: { limit: 2, ttl: 60000 } })
  public refreshToken(@Req() request: RequestWithUser<User>) {
    return this.authLibService.refreshToken(request);
  }
}
