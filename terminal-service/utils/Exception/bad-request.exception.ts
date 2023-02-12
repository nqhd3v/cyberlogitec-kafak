import { Exception } from './exception';
import { HttpStatus } from './http-status.enum';

/**
 * BAD REQUEST - INVALID REQUEST
 */
export class BadReqException extends Exception {
  constructor(message = '', data?: Record<string, any>) {
    super(HttpStatus.BAD_REQUEST, message, data);
  }
}
