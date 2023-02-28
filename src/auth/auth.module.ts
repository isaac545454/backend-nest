import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: "Cy*&f8FmhN*2Ju4R22w16Bli#2a@7Q17",
    }),
  ],
})
export class AuthModule {}
