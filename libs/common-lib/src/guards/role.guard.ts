import { UserRole } from '@app/users-lib/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../interfaces';
import { User } from '@app/users-lib/entities';

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequired = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!rolesRequired) {
      return true;
    }

    const request: RequestWithUser<User> = context.switchToHttp().getRequest();
    const user = request.user;

    return rolesRequired.some((role) => role === user.role);
  }
}
