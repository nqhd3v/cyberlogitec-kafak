import { Exception } from './exception';
import { HttpStatus } from './http-status.enum';

/**
 * BAD REQUEST - INVALID REQUEST
 */
export class Http400Exception extends Exception {
  constructor(message = '', data?: Record<string, any>) {
    super(HttpStatus.BAD_REQUEST, message, data);
  }
}
