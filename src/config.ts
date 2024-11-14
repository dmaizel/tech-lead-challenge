import * as env from 'env-var';
import { registerAs } from '@nestjs/config';

export const serviceConfig = registerAs('service', () => ({
  port: env.get('PORT').default(3000).asPortNumber(),
  name: env.get('SERVICE_NAME').default('log-service').asString(),
  version: env.get('SERVICE_VERSION').default('0.0.0').asString(),
}));

export const mongoConfig = registerAs('mongoDb', () => ({
  connectionString: env
    .get('MONGODB_CONNECTION_STRING')
    .default('mongodb://127.0.0.1:27017/log')
    .asString(),
}));
