import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async findOne(@Param() param) {
    return { user: {}, param };
  }

  @Put(":id")
  async update(
    @Param() param,
    @Body() { email, name, password }: UpdateUserDTO
  ) {
    return { user: { email, name, password } };
  }

  @Patch(":id")
  async updatePartial(@Param() param, @Body() Body: PathUserDTO) {
    return { user: {}, param, Body };
  }

  @Delete(":id")
  async delete(@Param() param) {
    return { param };
  }
}
