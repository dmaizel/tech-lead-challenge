import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import {
  LogCreate,
  LogCreateResponseDto,
} from './dtos/log-create.dto';
import { logGetByTimeRangeRequestDto, logGetByTimeRangeResponseDto } from './dtos/log-get-by-timerange.dto';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  create(log: LogCreate): Promise<LogCreateResponseDto> {
    return this.logRepository.create(log);
  }

  async getByTimeRange(getByTimeRange: logGetByTimeRangeRequestDto): Promise<unknown> {
    return this.logRepository.getByTimeRange(getByTimeRange);
  }
}
