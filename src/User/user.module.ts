import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
  imports: [],
  controllers: [UserController],
  //   provider: [],
  exports: [],
})
export class UserModule {}
