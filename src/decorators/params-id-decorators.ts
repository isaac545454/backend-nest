import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const paramsId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().params.id);
  }
);
