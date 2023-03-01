import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuhtService {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly prisma: PrismaService
  ) {}
  async createToken() {
    return;
  }
  async checkToken(token: string) {
    return;
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new UnauthorizedException("Email ou senha incorretos.");

    return user;
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

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}
