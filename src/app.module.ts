import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors';
import { OpenAIController } from './api/openai/controllers';

@Module({
  imports: [],
  controllers: [
    AppController,
    OpenAIController,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
  ],
})
export class AppModule { }
