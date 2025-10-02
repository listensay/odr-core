import { IResponse } from '../interfaces/response.interface';

export class ResponseUtil {
  static success<T>(data: T, message = 'ok'): IResponse<T> {
    return {
      code: 200,
      message,
      data,
      success: true,
    };
  }

  static error(message: string, code = 500): IResponse<null> {
    return {
      code,
      message,
      data: null,
      success: false,
    };
  }
}
