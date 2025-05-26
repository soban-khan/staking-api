import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    let err = exception['response'];
    err = err.response ? err.response : JSON.stringify(err);
    const context = host.switchToHttp(),
      response = context.getResponse<Response>(),
      request = context.getRequest(),
      requestHeaders = request.headers,
      status = exception.getStatus();
    this.logger.error(
      `Error on API::- [${context.getRequest().method} :${
        context.getRequest().url
      }] || Error Message::- [${JSON.stringify(err)}] || Host::- [${
        requestHeaders.host
      }] || Origin::- [${requestHeaders.origin}] || Request IP::- [${
        request.headers['x-forwarded-for'] || request.ip || null
      }]`,
    );
    const error =
      typeof exception.getResponse() === 'string'
        ? exception.getResponse()
        : exception.getResponse() &&
            typeof exception.getResponse()['message'] === 'object'
          ? exception.getResponse()['message'].join(', ')
          : exception.getResponse()['message'];
    if (err.includes('duplicate key value')) {
      response.status(status).json({
        isSuccess: false,
        error: 'Duplicate Entry',
        data: {},
      });
    } else if (err.includes('violates foreign key constraint')) {
      response.status(status).json({
        isSuccess: false,
        error: `Foreign Key Error`,
        data: {},
      });
    } else {
      response.status(status).json({
        isSuccess: false,
        error: error,
        data: {},
      });
    }
  }
}
