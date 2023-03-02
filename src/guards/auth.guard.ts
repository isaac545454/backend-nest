import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserService } from "src/User/user.service";
import { AuhtService } from "../auth/auth.service";

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
