import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "src/decorators/user-decators";
import { AuthGuard } from "src/guards/auth.guard";
import { UserService } from "src/User/user.service";
import { AuhtService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { AuthResetDTO } from "./dto/auth-reset-dto";
import { writeFile } from "fs/promises";
import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuhtService,
    private readonly fileService: FileService
  ) {}

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post("forget")
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post("reset")
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }
  @UseGuards(AuthGuard)
  @Post("me")
  async me(@User("email") user) {
    return { user: user };
  }

  @UseInterceptors(FileInterceptor("file"))
  @UseGuards(AuthGuard)
  @Post("photo")
  async upload(@User() user, @UploadedFile() photo: Express.Multer.File) {
    const path = join(
      __dirname,
      "../",
      "../",
      "storage",
      "photos",
      `photos-${user.id}.png`
    );

    this.fileService.upload(photo, path);

    return { sucess: true };
  }
}
