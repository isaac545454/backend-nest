import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuhtService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuhtService) {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );

      request.tokenPayload = data;
      return true;
    } catch (t) {
      return false;
    }
  }
}
