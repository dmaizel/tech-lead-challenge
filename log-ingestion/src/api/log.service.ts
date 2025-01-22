import { Injectable, Logger } from '@nestjs/common';
import { LogBatchDto } from './models/dtos/log-dto';
import { InjectModel } from '@nestjs/mongoose';
import { LogRecord } from 'src/database/log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(LogRecord.name) private logRepo: Model<LogRecord>,
    private readonly logger: Logger,
  ) {}

  async insertLogs(batchedLogs: LogBatchDto) {
    try {
      return await this.logRepo.insertMany(batchedLogs.logs);
    } catch (e) {
      this.logger.error('Couldnt save logs'); //TODO: create json obj of db error type
    }
  }
}
