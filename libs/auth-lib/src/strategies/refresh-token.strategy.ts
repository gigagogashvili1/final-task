import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersRepository } from '@app/users-lib/repositories';
import { UserJwtPayload } from '@app/common-lib/interfaces';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
  public constructor(
    private readonly userRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request.cookies['refresh_token'];

          return token || null;
        },
      ]),
    });
  }

  public async validate(payload: UserJwtPayload | null) {
    if (!payload) {
      throw new UnauthorizedException("Refresh token not found in the cookies, or it's not a valid one!");
    }

    const { sub } = payload;
    const user = await this.userRepository.findOneById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
