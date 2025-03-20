import { ErrorCode } from "../common/enums/error-code.enum.js";
import { HTTPSTATUS, HttpStatusCode } from "../constants/http.config.js";

class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: ErrorCode;

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError }