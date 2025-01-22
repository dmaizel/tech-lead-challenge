import { Controller, Get, Query } from '@nestjs/common';
import { LogsQueryService } from './logs.query.service';
import { LogQueryDto } from './models/dtos/log-query-dto';
import { LogAggregationDto } from './models/dtos/log-group-dto';

@Controller('logs')
export class LogsQueryController {
  constructor(private readonly logQueryService: LogsQueryService) {}

  @Get()
  async getLogs(@Query() query: LogQueryDto) {
    const { limit = 50, page = 1, ...filters } = query;

    const result = await this.logQueryService.queryLogs(filters, limit, page);
    return {
      data: result.data,
      total: result.total,
      currentPage: page,
      totalPages: Math.ceil(result.total / limit),
    };
  }

  @Get('/aggregate')
  async aggregateLogs(@Query() query: LogAggregationDto) {
    const { groupBy } = query;
    return this.logQueryService.aggregateLogsByField(groupBy);
  }
}
