import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FileModule } from "src/file/file.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/User/user.module";
import { AuthController } from "./auth.controller";
import { AuhtService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
    }),
    forwardRef(() => UserModule),
    PrismaModule,
    FileModule,
  ],
  controllers: [AuthController],
  providers: [AuhtService],
  exports: [AuhtService],
})
export class AuthModule {}
