import { PrismaClient } from ".prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

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

  async update(id: number, data: UpdateUserDTO) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async updatePartial(id: number, data: PathUserDTO) {
    //
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id: id }, select: { id: true } });
  }

  async exists(id: number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException("o usuario não existe");
    }
  }
}
