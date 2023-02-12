import { Exception } from './exception';
import { HttpStatus } from './http-status.enum';

/**
 * SERVICE_UNAVAILABLE
 *
 */
export class Http503Exception extends Exception {
  constructor(message = '', data?: Record<string, any>) {
    super(HttpStatus.SERVICE_UNAVAILABLE, message, data);
  }
}
