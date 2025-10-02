import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = '服务器内部错误';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        message =
          (exceptionResponse as any).message ||
          (exceptionResponse as any).error ||
          message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    console.log(message);

    // 处理特定错误消息
    message = this.handleErrorMessage(message);

    const errorResponse: IResponse<null> = {
      code: status,
      message,
      data: null,
      success: false,
    };

    response.status(status).json(errorResponse);
  }

  private handleErrorMessage(message: string): string {
    switch (true) {
      case message.includes('Duplicate entry'):
        return '重复数据，停止新增';
      default:
        return message;
    }
  }
}
