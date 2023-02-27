import { CallHandler, NestInterceptor, ExecutionContext } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`URL: ${request.url}`);
        console.log(`method: ${request.method}`);
        console.log(`execução levou ${Date.now() - dt} milisegundos`);
      })
    );
  }
}
