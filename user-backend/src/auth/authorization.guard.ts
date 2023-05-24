import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const paramId: number = +request.params.id
    if (Number.isNaN(paramId) && request.params.id) {
      throw new BadRequestException('Érvénytelen azonosító')
    }
    return true
  }
}
