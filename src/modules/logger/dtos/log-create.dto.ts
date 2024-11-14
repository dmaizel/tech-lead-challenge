import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';
import { LOG_LEVEL, SOURCE_TYPE } from '../types/log.type';

export const logCreateZodSchema = z.object({
  message: z.string().max(5000),
  level: z.enum(LOG_LEVEL),
  timestamp: z.coerce.date(),
  source: z.object({
    type: z.enum(SOURCE_TYPE),
    entity: z.string().max(100),
    entityInstance: z.string().max(100),
  }),
  metadata: z.object({
    key: z.string().max(30),
    value: z.string().max(100),
  }).array().optional(),
});

export class LogCreateRequestDto extends createZodDto(logCreateZodSchema) { }
export class LogCreateResponseDto extends createZodDto(logCreateZodSchema) { }

export type LogCreate = z.infer<typeof logCreateZodSchema>;
