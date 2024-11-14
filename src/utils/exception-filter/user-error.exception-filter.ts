import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserError } from '../errors/user-error';

@Catch(UserError)
export class UserExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: UserError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, name, status, cause, stack } = exception;

    console.info(message, { name, status, cause, stack });

    response.status(status).json({
      name,
      path: request.url,
      timestamp: new Date().toISOString(),
      statusCode: status,
    });
  }
}
