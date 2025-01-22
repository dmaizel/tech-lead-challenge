import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogRecord } from 'src/database/log.schema';
import { Model } from 'mongoose';

@Injectable()
export class LogsQueryService {
  constructor(
    @InjectModel(LogRecord.name) private logRepo: Model<LogRecord>,
    private readonly logger: Logger,
  ) {}

  async queryLogs(
    filters: Record<string, any>,
    limit: number,
    page: number,
  ): Promise<{ data: LogRecord[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.logRepo
        .find(filters)
        .sort({ timestamp: -1 })
        .limit(limit)
        .skip(skip)
        .exec(),
      this.logRepo.countDocuments(filters),
    ]);

    return { data, total };
  }

  async aggregateLogsByField(groupByField: string): Promise<any[]> {
    const aggregationResult = await this.logRepo.aggregate([
      {
        $group: {
          _id: `$${groupByField}`,
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return aggregationResult.map((item) => ({
      [groupByField]: item._id,
      count: item.count,
    }));
  }
}
