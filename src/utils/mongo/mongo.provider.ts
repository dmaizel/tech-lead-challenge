import * as mongoose from 'mongoose';
import { MONGO_CONNECTION } from '../../constants';
import { ConfigType } from '@nestjs/config';
import { mongoConfig } from '../../config';

export const mongoProviders = [
  {
    provide: MONGO_CONNECTION,
    inject: [mongoConfig.KEY],
    useFactory: (
      config: ConfigType<typeof mongoConfig>,
    ): mongoose.Connection => {
      const connection = mongoose.createConnection(config.connectionString);

      connection.on('connection', () => {
        console.info('[MongoDB] - connection established');
      });
      connection.on('error', (error) => {
        console.error('[MongoDB] - connection error', JSON.stringify(error));
      });

      connection.on('close', () => {
        console.info('[MongoDB] - connection closed');
      });

      return connection;
    },
  },
];
