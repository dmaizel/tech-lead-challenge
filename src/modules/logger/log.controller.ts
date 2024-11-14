import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { logGetByTimeRangeRequestDto } from './dtos/log-get-by-timerange.dto';
import { LogService } from './log.service';
import { LogCreateRequestDto } from './dtos/log-create.dto';

@ApiTags('logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('')
  getByTimeRange(
    @Query()
    query: logGetByTimeRangeRequestDto,
  ) {
    return this.logService.getByTimeRange(query);
  }

  @Post('')
  create(@Body() body: LogCreateRequestDto) {
    return this.logService.create(body);
  }
}
