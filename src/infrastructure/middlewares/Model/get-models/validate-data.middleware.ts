import { Request, Response, NextFunction } from 'express';
import { JoiValidator } from '../../../utils/joi.validator';
import {
  filterParamsSchema,
} from '../../../../core/Model/domain/model.schemas';

export const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const validation = JoiValidator.validateSchema(
      filterParamsSchema,
      req.query,
    );

    if (validation.error) {
      res.status(400).json({
        message: validation.error.message,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error during validation',
    });
  }
};
