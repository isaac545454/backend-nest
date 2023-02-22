import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() Body) {
    return { Body };
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
  async update(@Param() param, @Body() Body) {
    return { user: {}, param, Body };
  }

  @Patch(":id")
  async updatePartial(@Param() param, @Body() Body) {
    return { user: {}, param, Body };
  }
}
