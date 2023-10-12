import { Module } from '@nestjs/common';
import { AuthLibService } from './auth-lib.service';
import { UsersLibModule } from '@app/users-lib';
import { CryptoLibModule } from '@app/crypto-lib';
import { NotificationsLibModule } from '@app/notifications-lib';

@Module({
  imports: [UsersLibModule, CryptoLibModule, NotificationsLibModule],
  providers: [AuthLibService],
  exports: [AuthLibService],
})
export class AuthLibModule {}
