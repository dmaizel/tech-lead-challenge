import { IsEnum, IsString } from 'class-validator';

export enum GroupByField {
  LOG_SOURCE = 'logSource',
  HOST = 'host',
  TYPE = 'type',
  ENV = 'env',
}

export class LogAggregationDto {
  @IsString()
  @IsEnum(GroupByField, {
    message: `groupBy must be one of: ${Object.values(GroupByField).join(', ')}`,
  })
  groupBy: GroupByField;
}
