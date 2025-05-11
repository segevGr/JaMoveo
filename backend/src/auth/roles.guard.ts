import {
	Injectable,
	CanActivate,
	ExecutionContext,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../common/decorators/roles.decorator';
  import { UserRole } from '../users/user.schema';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
  
	canActivate(context: ExecutionContext): boolean {
	  const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
		context.getHandler(),
		context.getClass(),
	  ]);
	  if (!requiredRoles || requiredRoles.length === 0) return true;
  
	  const { user } = context.switchToHttp().getRequest();
	  return requiredRoles.includes(user.role);
	}
  }
  