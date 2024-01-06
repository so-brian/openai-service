import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class Response<T> {
    data: T;
    message: string;

    /**
     *
     */
    constructor(data: T, message: string) {
        this.data = data;
        this.message = message;
    }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, call$: CallHandler<T>): Observable<Response<T>> {
        return call$.handle().pipe(map(data => (new Response<T>(data, "success"))));
    }
}
