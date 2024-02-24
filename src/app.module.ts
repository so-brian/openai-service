import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors';
import { OpenAIController } from './api/openai/controllers';
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
    }
  ],
})
export class AppModule { }
