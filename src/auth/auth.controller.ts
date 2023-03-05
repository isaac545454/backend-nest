import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuhtService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget-dto";
import { AuthLoginDTO } from "./dto/auth-login-dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthRegisterDTO } from "./dto/auth-register-dto";
import { AuthResetDTO } from "./dto/auth-reset-dto";
import { join } from "path";
import { UserService } from "../User/user.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user-decators";
import { FileService } from "../file/file.service";

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
  async upload(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: "image/jpeg",
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 50,
          }),
        ],
      })
    )
    photo: Express.Multer.File
  ) {
    const path = join(
      __dirname,
      "../",
      "../",
      "storage",
      "photos",
      `photos-${user.id}.jpeg`
    );
    try {
      this.fileService.upload(photo, path);
    } catch (error) {
      throw new BadRequestException(error);
    }

    return { sucess: true };
  }
}
