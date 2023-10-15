import { Module } from '@nestjs/common';
import { AuthLibService } from './auth-lib.service';
import { UsersLibModule } from '@app/users-lib';
import { NotificationsLibModule } from '@app/notifications-lib';
import { AccessTokenStrategy, LocalStrategy, RefreshTokenStrategy } from './strategies';
import { UtilsLibModule } from '@app/utils-lib';

@Module({
  imports: [UsersLibModule, UtilsLibModule, NotificationsLibModule],
  providers: [AuthLibService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthLibService],
})
export class AuthLibModule {}
