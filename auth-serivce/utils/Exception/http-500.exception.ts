import { Exception } from './exception';
import { HttpStatus } from './http-status.enum';

/**
 * SERVER_INTERNAL_ERROR - INVALID REQUEST
 *
 */
export class Http500Exception extends Exception {
  constructor(message = '', data?: Record<string, any>) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, data);
  }
}
