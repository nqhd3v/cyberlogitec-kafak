import { HttpException } from '@nestjs/common';

const MAP_STATUS_MSG = {
  400: 'exception.client.invalid-input',
  401: 'exception.client.unauthorized',
  403: 'exception.client.forbidden',
  404: 'exception.client.data-not-found',
  409: 'exception.client.request-handling',
  500: 'exception.server.unknown',
  501: 'exception.server.not-handled',
  502: 'exception.server.unknown',
  503: 'exception.server.unavailable',
  506: 'exception.server.wrong-configuration',
  // Custom error
  310: 'Server is in maintenance progress!',
};

export class Exception extends HttpException {
  constructor(status: number, message = '', data?: Record<string, any>) {
    super(
      {
        msg: message === '' ? MAP_STATUS_MSG[status] : message,
        data,
      },
      status,
    );
  }
}
