import { compare, genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoLibService {
  public comparePassword(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  public async hashPassword(payload: string, saltValue: number = 10) {
    const salt = await this.generateSaltValue(saltValue);
    return await hash(payload, salt);
  }

  public generateSaltValue(saltValue: number) {
    return genSalt(saltValue);
  }

  public generateOtpCode() {
    const min = 100000;
    const max = 999999;
    const otp = Math.floor(Math.random() * (max - min + 1) + min);
    return otp.toString();
  }
}
