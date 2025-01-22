import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LogRecord, LogSchema } from 'src/database/log.schema';
import { LogsService } from './log.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogRecord.name, schema: LogSchema }]),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
