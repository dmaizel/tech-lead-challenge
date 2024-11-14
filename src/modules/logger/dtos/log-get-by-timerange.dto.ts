import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';
import { ObjectIdZodSchema } from '../../../utils/zod/object-id.zod.utils';
import { LOG_LEVEL } from '../types/log.type';
import { logCreateZodSchema } from './log-create.dto';

const logGetByTimeRangeRequestZodSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  level: z.enum(LOG_LEVEL).optional(),
  entity: z.string().optional(),
});

export class logGetByTimeRangeRequestDto extends createZodDto(logGetByTimeRangeRequestZodSchema) { }
export class logGetByTimeRangeResponseDto extends createZodDto(logCreateZodSchema.merge(z.object({ id: ObjectIdZodSchema, }))) { }
