import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuhtService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuhtService) {}
  canActivate(context: ExecutionContext) {
    const { authorization } = context.switchToHttp().getRequest().headers;
    return this.authService.isValidation((authorization ?? "").split(" ")[1]);
  }
}
