import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbLibModule } from '@app/db-lib';
import { EnvJoiSchema } from '@app/common-lib/schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvJoiSchema }),
    DbLibModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
