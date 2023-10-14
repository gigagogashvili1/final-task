import { UserRole } from '@app/users-lib/enums';

export interface UserJwtPayload {
  sub: number;
  email: string;
  role: UserRole;
}
