import { ApplicationError } from './application-error';

export class UserError extends ApplicationError {
  constructor(message = 'User Error', status = 400) {
    super(message, status, 'UserError', message);
  }
}
