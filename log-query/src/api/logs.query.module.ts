import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogRecord, LogSchema } from 'src/database/log.schema';
import { LogsQueryService } from './logs.query.service';
import { LogsQueryController } from './logs.query.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogRecord.name, schema: LogSchema }]),
  ],
  controllers: [LogsQueryController],
  providers: [LogsQueryService],
})
export class LogsQueryModule {}
