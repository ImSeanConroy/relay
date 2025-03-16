import { z } from "zod";
import { ErrorRequestHandler, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { HTTPSTATUS } from "../constants/http.config.js";

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

const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
}

const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
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
    return handleAppError(res, error)
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: error?.message || "Unknown error occurred",
  });
};

export { errorHandler };
