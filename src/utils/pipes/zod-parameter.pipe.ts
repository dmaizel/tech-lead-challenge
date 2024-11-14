import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { ValidationError } from '../errors/validation.user-error';

@Injectable()
export class ZodParameterPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const parseResponse = this.schema.safeParse(value);

    if (parseResponse.success) return parseResponse.data;

    throw new ValidationError(parseResponse.error);
  }
}
