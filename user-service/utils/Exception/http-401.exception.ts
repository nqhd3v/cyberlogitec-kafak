import { Exception } from './exception';
import { HttpStatus } from './http-status.enum';

/**
 * UNAUTHORIZED
 */
export class Http401Exception extends Exception {
  constructor(message = '', data?: Record<string, any>) {
    super(HttpStatus.UNAUTHORIZED, message, data);
  }
}
