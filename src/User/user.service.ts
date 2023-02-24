import { PrismaClient } from ".prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    PrismaClient;
  }

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: { email, name, password },
      select: {
        id: true,
        email: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async delete(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("o usuario não existe");
    }
    return this.prisma.user.delete({ where: { id: id }, select: { id: true } });
  }
}
