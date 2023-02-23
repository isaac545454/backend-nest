import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO) {
    return { email, name, password };
  }

  @Get()
  async findAll() {
    return { users: [] };
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() { email, name, password }: UpdateUserDTO
  ) {
    return { user: { email, name, password, id } };
  }

  @Patch(":id")
  async updatePartial(
    @Param("id", ParseIntPipe) id: number,
    @Body() Body: PathUserDTO
  ) {
    return { user: {}, id, Body };
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    return { id };
  }
}
