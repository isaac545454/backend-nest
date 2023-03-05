import { PrismaClient } from ".prisma/client";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as brypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {
    PrismaClient;
  }

  async create({ email, name, password, role }: CreateUserDTO) {
    if (await this.prisma.user.count({ where: { email } })) {
      throw new BadRequestException("Este e-mail já está sendo usado.");
    }
    const salt = await brypt.genSalt();

    password = await brypt.hash(password, salt);

    return this.prisma.user.create({
      data: { email, name, password, role },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async update(
    id: number,
    { birthAt, name, email, password, role }: UpdateUserDTO
  ) {
    await this.exists(id);

    const salt = await brypt.genSalt();

    password = await brypt.hash(password, salt);

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        password,
        name,
        role,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    });
  }

  async updatePartial(
    id: number,
    { birthAt, name, email, password, role }: PathUserDTO
  ) {
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }
    if (name) {
      data.birthAt = name;
    }
    if (email) {
      data.birthAt = email;
    }
    if (password) {
      const salt = await brypt.genSalt();

      password = await brypt.hash(password, salt);
      data.birthAt = password;
    }
    if (role) {
      data.birthAt = role;
    }

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        password,
        name,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id: id }, select: { id: true } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException("o usuario não existe");
    }
  }
}
