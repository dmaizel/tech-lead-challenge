import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, name, cause, stack } = exception;

    const status = 500;

    console.error(message, { name, cause, stack, status });

    response.status(status).json({
      name: 'Server Error',
      path: request.url,
      timestamp: new Date().toISOString(),
      statusCode: status,
    });
  }
}
