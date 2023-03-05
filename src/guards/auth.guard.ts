import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { AuhtService } from "../auth/auth.service";
import { UserService } from "../User/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuhtService,
    private readonly userService: UserService
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1]
      );

      request.tokenPayload = data;
      request.user = await this.userService.findOne(data.id);

      return true;
    } catch (t) {
      return false;
    }
  }
}
