import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerError } from '../errors/server-error';

@Catch(ServerError)
export class ServerExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: ServerError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { message, name, status, cause, stack } = exception;

    console.error(message, { name, status, cause, stack });

    response.status(status).json({
      name: 'Server Error',
      path: request.url,
      timestamp: new Date().toISOString(),
      statusCode: status,
    });
  }
}
