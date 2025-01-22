import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: new winston.transports.Console(),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format((info) => {
          info.context = info.context || ' General';
          return info;
        })(),
        winston.format.json(),
      ),
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
