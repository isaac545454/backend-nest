import { User } from ".prisma/client";
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/User/user.service";
import { AuthRegisterDTO } from "./dto/auth-register-dto";

@Injectable()
export class AuhtService {
  private audience = "user";
  private issuer = "login";
  constructor(
    private readonly jwtservice: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async createToken(user: User) {
    return {
      acessTokem: this.jwtservice.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        }
      ),
    };
  }
  async checkToken(token: string) {
    try {
      const data = this.jwtservice.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async isValidation(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new UnauthorizedException("Email ou senha incorretos.");

    return this.createToken(user);
  }
  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException("Email incorretos.");

    //TODO: ENVIAR EMAIL

    return true;
  }
  async reset(password: string, token: string) {
    //TODO:token valido?

    const id = 1;

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password,
      },
    });
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user as User);
  }
}
