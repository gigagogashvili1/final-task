import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ConflictException, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '@app/users-lib/repositories';
import { CryptoLibService } from '@app/utils-lib/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly cryptoLibService: CryptoLibService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOneByEmail(email);
      if (!user) throw new UnauthorizedException('Invalid Credentials!');
      const { password: hashedPassword, ...userWithoutPassword } = user;
      const doesPasswordsMatch = await this.cryptoLibService.comparePassword(password, hashedPassword);
      if (!doesPasswordsMatch) {
        throw new ConflictException('Invalid Password!');
      }
      return userWithoutPassword;
    } catch (err) {
      throw err;
    }
  }
}
