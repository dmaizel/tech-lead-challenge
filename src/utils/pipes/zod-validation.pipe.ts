import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ValidationError } from '../errors/validation.user-error';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;

    if (!zodSchema) return value;

    const parseResult = zodSchema.safeParse(value);

    if (parseResult.success) return parseResult.data;

    throw new ValidationError(parseResult.error);
  }
}
