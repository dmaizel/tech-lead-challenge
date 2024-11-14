import { FeatureModule } from './modules/logger/log.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mongoConfig, serviceConfig } from './config';
import { ZodValidationPipe } from './utils/pipes/zod-validation.pipe';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { UnknownExceptionFilter } from './utils/exception-filter/unknown.exception-filter';
import { ServerExceptionFilter } from './utils/exception-filter/server-error.exception-filter';
import { UserExceptionFilter } from './utils/exception-filter/user-error.exception-filter';
import { ValidationExceptionFilter } from './utils/exception-filter/validation-error.exception-filter';

@Module({
  imports: [
    FeatureModule,
    ConfigModule.forRoot({
      load: [
        serviceConfig,
        mongoConfig,
      ],
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: UnknownExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ServerExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UserExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}
