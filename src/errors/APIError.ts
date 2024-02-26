const timestamp = new Date().toISOString();

export interface IHttpResponse {
  title: string;
  message?: string;
  success: boolean;
  status: number;
  timestamp: string;
  //   isOperational: boolean;
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export interface IServerError {
  STATUS: HttpStatusCode;
  TITLE: string;
  MESSAGE?: string;
  //   isOperational: boolean;
}

export type IAPIError = IServerError;

export class APIError extends Error {
  statusCode: HttpStatusCode;
  title: string;
  success: boolean;
  isOperational: boolean;

  constructor(option: IAPIError) {
    super(option?.MESSAGE);
    Object.setPrototypeOf(this, APIError.prototype);
    this.title = option.TITLE;
    this.statusCode = option.STATUS;
    (this.success = false), (this.isOperational = true);
  }

  serializeError() {
    return {
      title: this.title,
      message: this?.message,
      success: this.success,
      status: this.statusCode,
      timestamp: timestamp,
    } satisfies IHttpResponse;
  }

  toString() {
    return (
      'APIError: ' +
      this.statusCode +
      ' - ' +
      this.title +
      ' - ' +
      this.message +
      '\n'
    );
  }
}
