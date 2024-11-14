import { ZodError } from 'zod';
import { UserError } from './user-error';

export class ValidationError extends UserError {
  constructor(
    public zodError: ZodError,
    message = 'Validation Error',
  ) {
    super(message, 400);
  }
}
