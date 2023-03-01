import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @IsJWT()
  token: string;
}
