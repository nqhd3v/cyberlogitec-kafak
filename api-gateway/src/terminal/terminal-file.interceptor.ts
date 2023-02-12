import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
  mixin,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as multer from 'multer';
import { extname, join } from 'path';
import { mkdirSync } from 'fs';

type TerminalFileInterceptorOptions = {
  fieldname: string;
};

function TerminalFileInterceptor({
  fieldname,
}: TerminalFileInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class FileInterceptor implements NestInterceptor {
    private upload;

    constructor() {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          const dst = join(
            process.cwd(),
            'public',
            'upload',
            'terminal',
            req.params.id,
          );
          mkdirSync(dst, { recursive: true });
          cb(null, dst);
        },
        filename: function (req, file, cb) {
          cb(null, `${req.body.filename}${extname(file.originalname)}`);
        },
      });

      this.upload = multer({ storage });
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      return new Promise((resolve, reject) => {
        this.upload.single(fieldname)(request, response, (error) => {
          if (error) {
            return reject(
              new HttpException(error.message, HttpStatus.BAD_REQUEST),
            );
          }
          request.file = request.file || {};
          return resolve(next.handle());
        });
      });
    }
  }
  return mixin(FileInterceptor);
}

export default TerminalFileInterceptor;
