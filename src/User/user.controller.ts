import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { paramsId } from "../decorators/params-id-decorators";
import { Roles } from "../decorators/role-decorators";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../guards/auth.guard";
import { RoleGuard } from "../guards/role.guard";
import { LogInterceptor } from "../interceptors/log.interceptor";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Roles(Role.User)
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
  async findOne(@paramsId() id: number) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  async update(@paramsId() id: number, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }

  @Patch(":id")
  async updatePartial(@paramsId() id: number, @Body() Body: PathUserDTO) {
    return this.userService.updatePartial(id, Body);
  }

  @Delete(":id")
  async delete(@paramsId() id: number) {
    return this.userService.delete(id);
  }
}
