import { z } from "zod";
import { ErrorRequestHandler, Response, Request, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";
import { HTTPSTATUS } from "../constants/http.config.js";

/**
 * Handles Zod validation errors and formats the response.
 *
 * @param res - The Express response object to send the error response.
 * @param error - The Zod error object containing validation issues.
 * @returns A JSON response with detailed validation errors.
 */
const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));
  return res.status(HTTPSTATUS.BAD_REQUEST).json({
    message: "Validation failed",
    errors: errors,
  });
};

/**
 * Handles custom application errors (AppError) and formats the response.
 *
 * @param res - The Express response object to send the error response.
 * @param error - The AppError object containing error details.
 * @returns A JSON response with the error message and code.
 */
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

/**
 * General error handler middleware for Express.
 * Catches all errors thrown by routes or middleware and formats them based on the error type.
 *
 * @param error - The error object, which can be of various types.
 * @param req - The Express request object.
 * @param res - The Express response object to send the error response.
 * @param next - The next middleware function.
 * @returns A JSON response with the error message.
 */
const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(`PATH: ${req.path}`, error);

  // if (error instanceof SyntaxError) {
  //   return res.status(HTTPSTATUS.BAD_REQUEST).json({
  //     message: "Invalid JSON format, please check your request body",
  //   });
  // }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};

export { errorHandler };
