import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors';
import { OpenAIController, OpenAIService, IOpenAIServiceToken } from './api/openai';
import { PingController } from './api/ping';

@Module({
  imports: [],
  controllers: [
    OpenAIController,
    PingController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
      scope: Scope.REQUEST,
    },
    {
      provide:  IOpenAIServiceToken,
      useClass: OpenAIService,
      scope: Scope.REQUEST,
    }
  ],
})
export class AppModule { }
