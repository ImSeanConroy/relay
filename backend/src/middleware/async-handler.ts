import { NextFunction, Request, Response } from "express";

type AsynControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/**
 * Function that wraps an asynchronous controller.
 * It catches any errors thrown in the controller and passes them to the error-handling middleware.
 *
 * @param controller - The asynchronous controller function to be wrapped.
 * @returns A new function that catches errors and forwards them to the error-handling middleware.
 */
export const asyncHandler =
  (controller: AsynControllerType): AsynControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
