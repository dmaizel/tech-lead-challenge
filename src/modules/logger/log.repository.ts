import { Inject, Injectable } from '@nestjs/common';
import { LOG_MODEL } from './log.mongoose.schema';
import { Model } from 'mongoose';
import { Log } from './types/log.type';
import { LogCreate } from './dtos/log-create.dto';
import { logGetByTimeRangeRequestDto } from './dtos/log-get-by-timerange.dto';

@Injectable()
export class LogRepository {
  constructor(
    @Inject(LOG_MODEL)
    private readonly logModel: Model<Log>,
  ) { }

  async getByTimeRange(getByTimeRange: logGetByTimeRangeRequestDto) {
    const { endDate, startDate, entity, level } = getByTimeRange;

    return this.logModel.find({
      timestamp: { $gte: startDate, $lt: endDate },
      entity,
      level,
    }).limit(100).lean().exec();
  }
  async create(log: LogCreate) {
    return this.logModel.create(log);
  }
}
