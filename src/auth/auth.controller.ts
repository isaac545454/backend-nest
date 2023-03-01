import { Body, Controller, Post } from "@nestjs/common";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { AuthRegisterDTO } from "./dto/auth-register-dto";

@Controller("auth")
export class AuthController {
  @Post("login")
  async login(@Body() Body: AuthLoginDTO) {
    //
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO) {
    //
  }

  @Post("forget")
  async forget(@Body() body: AuthForgetDTO) {
    //
  }

  @Post("reset")
  async reset(@Body() body: AuthResetDTO) {
    //
  }
}
