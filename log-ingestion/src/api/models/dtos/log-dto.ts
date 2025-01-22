import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LogItemDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsISO8601()
  timestamp: string;

  @IsString()
  @IsEnum(['app', 'container', 'pod', 'vm'])
  host: string;

  @IsString()
  @IsEnum(['info', 'error', 'debug'])
  type: string;

  @IsString()
  @IsEnum(['dev', 'stage', 'prod'])
  env: string;

  @IsString()
  @IsEnum(['http', 'database', 'system'])
  logSource: string;

  @IsObject()
  @IsNotEmpty()
  message: {
    description: string;
    details: Record<string, any>;
  };
}

export class LogBatchDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true })
  @Type(() => LogItemDto)
  logs: LogItemDto[];
}
