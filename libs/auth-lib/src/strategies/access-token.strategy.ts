import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersRepository } from '@app/users-lib/repositories';
import { ACCESS_TOKEN_SECRET } from '@app/utils-lib/constants';
import { UserJwtPayload } from '@app/common-lib/interfaces';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access_token') {
  public constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ACCESS_TOKEN_SECRET),
    });
  }

  public async validate(payload: UserJwtPayload) {
    const user = await this.userRepository.findOneById(payload.sub);
    if (!user) throw new UnauthorizedException('You are not authorized');
    return user;
  }
}
