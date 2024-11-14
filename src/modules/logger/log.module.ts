import { LogService } from './log.service';
import { LogRepository } from './log.repository';
import { LogController } from './log.controller';
import { Module } from '@nestjs/common';
import { MongoModule } from '../../utils/mongo/mongo.module';
import { MONGO_CONNECTION } from '../../constants';
import {
  COLLECTION_NAME,
  LOG_MODEL,
  LOG_SCHEMA,
} from './log.mongoose.schema';
import { Connection } from 'mongoose';

@Module({
  imports: [MongoModule],
  controllers: [LogController],
  providers: [
    LogService,
    LogRepository,
    {
      provide: LOG_MODEL,
      useFactory: (connection: Connection) =>
        connection.model(COLLECTION_NAME, LOG_SCHEMA),
      inject: [MONGO_CONNECTION],
    },
  ],
})
export class FeatureModule {}
