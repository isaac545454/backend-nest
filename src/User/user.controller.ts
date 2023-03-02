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
import { paramsId } from "src/decorators/params-id-decorators";
import { Roles } from "src/decorators/role-decorators";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PathUserDTO } from "./dto/patch-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.admin)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Roles(Role.admin)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.admin)
  @Get(":id")
  async findOne(@paramsId() id: number) {
    return this.userService.findOne(id);
  }

  @Roles(Role.admin)
  @Put(":id")
  async update(@paramsId() id: number, @Body() data: UpdateUserDTO) {
    return this.userService.update(id, data);
  }

  @Roles(Role.admin)
  @Patch(":id")
  async updatePartial(@paramsId() id: number, @Body() Body: PathUserDTO) {
    return this.userService.updatePartial(id, Body);
  }

  @Roles(Role.admin)
  @Delete(":id")
  async delete(@paramsId() id: number) {
    return this.userService.delete(id);
  }
}
