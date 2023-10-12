import { Module } from '@nestjs/common';
import { CryptoLibService } from './crypto-lib.service';

@Module({
  providers: [CryptoLibService],
  exports: [CryptoLibService],
})
export class CryptoLibModule {}
