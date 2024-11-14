import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from '../errors/validation.user-error';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: ValidationError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, name, status, cause, stack, zodError } = exception;

    const { issues } = zodError;

    console.info(message, { name, status, cause, stack, issues });

    response.status(status).json({
      name,
      path: request.url,
      issues,
      timestamp: new Date().toISOString(),
      statusCode: status,
    });
  }
}
