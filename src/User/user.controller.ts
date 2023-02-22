import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() Body) {
    return { Body };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(":id")
  async readOne(@Param() param) {
    return { user: {}, param };
  }
}
