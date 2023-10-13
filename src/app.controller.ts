import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor() {}

  @HttpCode(200)
  @Get('health')
  @HealthCheck()
  public health() {
    return { status: 'ok', info: { message: 'Your application is healthy!' } };
  }
}
