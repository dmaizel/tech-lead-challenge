import { ApplicationError } from './application-error';

export class ServerError extends ApplicationError {
  constructor(message = 'Server Error', status = 500, error?: Error) {
    super(message, status, 'ServerError', error);
  }
}
