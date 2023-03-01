import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/User/user.module";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({
      secret: "Cy*&f8FmhN*2Ju4R22w16Bli#2a@7Q17",
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
