import { INestApplication, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { serviceConfig } from './config';
import { ConfigType } from '@nestjs/config';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { ZodValidationPipe } from './utils/pipes/zod-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ZodValidationPipe());

  app.enableShutdownHooks();

  const appServiceConfig: ConfigType<typeof serviceConfig> = app.get(
    serviceConfig.KEY,
  );
  configureSwagger(app, appServiceConfig);
  await app.listen(appServiceConfig.port);

  console.info(
    `[${appServiceConfig.name}] Started on port ${appServiceConfig.port}`,
  );

  registerToExitEvents(app);
}

function registerToExitEvents(app: INestApplication) {
  process.on('uncaughtException', (error) =>
    exitGracefully(app, 'uncaughtException', error),
  );

  process.on('unhandledRejection', (error) =>
    exitGracefully(app, 'unhandledRejection', error),
  );
}

function exitGracefully(
  app: INestApplication,
  event: string,
  error: unknown,
) {
  console.error(`[${event}] - unknown error - ${JSON.stringify(error)}`);

  app
    .close()
    .then(() => {
      console.info('exiting gracefully');
      process.exitCode = 1;
    })
    .catch((shutdownError) => {
      console.error(
        `[${event}] - failed to exit gracefully - ${JSON.stringify(
          shutdownError,
        )}`,
      );

      console.info('exiting not gracefully');
      process.exitCode = 1;
    });
}

function configureSwagger(
  app: INestApplication,
  appServiceConfig: ConfigType<typeof serviceConfig>,
) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${appServiceConfig.name}`)
    .setDescription('description')
    .setVersion(appServiceConfig.version)
    .addTag('tag')
    .build();

  patchNestjsSwagger();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
}

void bootstrap();
