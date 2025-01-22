import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, res: Response, next: () => void) {
    const start = Date.now();
    const { method, ip } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const logLevel = statusCode >= 400 ? 'error' : 'log';

      this.logger[logLevel]({
        method,
        statusCode,
        ip,
        duration,
        context: 'HTTP',
      });
    });
    next();
  }
}
