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
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return { users: [] };
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
