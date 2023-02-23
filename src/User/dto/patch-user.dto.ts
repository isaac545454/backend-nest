import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class PathUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
