import { ErrorCode } from "../common/enums/error-code.enum.js";
import { HTTPSTATUS, HttpStatusCode } from "../constants/http.config.js";
import { AppError } from "./app-error.js";

/**
 * Custom error class for "Not Found" errors (HTTP 404).
 * 
 * @extends AppError
 */
export class NotFoundException extends AppError {
  constructor(message = "Resource not found", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.NOT_FOUND,
      errorCode || ErrorCode.RESOURCE_NOT_FOUND
    );
  }
}


/**
 * Custom error class for "Bad Request" errors (HTTP 400).
 * 
 * @extends AppError
 */
export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode?: ErrorCode) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}


/**
 * Custom error class for "Unauthorized" errors (HTTP 401).
 * 
 * @extends AppError
 */
export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized Access", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      errorCode || ErrorCode.ACCESS_UNAUTHORIZED
    );
  }
}


/**
 * Custom error class for "Internal Server" errors (HTTP 500).
 * 
 * @extends AppError
 */
export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error", errorCode?: ErrorCode) {
    super(
      message,
      HTTPSTATUS.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR
    );
  }
}


/**
 * Generic HTTP error class to handle all HTTP-related exceptions.
 * 
 * @extends AppError
 */
export class HttpException extends AppError {
  constructor(
    message = "Http Exception Error",
    statusCode: HttpStatusCode,
    errorCode?: ErrorCode
  ) {
    super(message, statusCode, errorCode);
  }
}