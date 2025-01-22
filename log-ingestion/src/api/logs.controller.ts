import { Body, Controller, Logger, Post } from '@nestjs/common';
import { LogBatchDto } from './models/dtos/log-dto';
import { LogsService } from './log.service';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly logService: LogsService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async ingestLogs(@Body() batchedLogs: LogBatchDto) {
    // TODO: add error handling, eg array is empty
    const proccessedLogs = await this.logService.insertLogs(batchedLogs);
    return {
      status: 'success',
      message: 'Logs ingested successfully',
      insertedCount: proccessedLogs.length,
    };
  }
}
