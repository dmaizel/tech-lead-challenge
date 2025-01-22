import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class LogQueryDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  @IsEnum(['info', 'error', 'debug'], { message: 'Invalid log type' })
  type?: string;

  @IsOptional()
  @IsEnum(['dev', 'stage', 'prod'], { message: 'Invalid environment' })
  env?: string;

  @IsOptional()
  @IsEnum(['http', 'db', 'system', 'auth', 'custom'], {
    message: 'Invalid log source',
  })
  logSource?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Transform to a number
  @Min(1, { message: 'Limit must be at least 1' })
  limit?: number; // Now explicitly a number

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10)) // Transform to a number
  @Min(1, { message: 'Page must be at least 1' })
  page?: number; // Now explicitly a number
}
