import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthAt: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;
}
