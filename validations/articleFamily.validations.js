import { body, validationResult } from 'express-validator';
import { errors } from '../utils/errors.utils.js';

export const createArticleFamily = [
  body('name').notEmpty().withMessage('name is required'),
  body('code').notEmpty().withMessage('code is required'),
  body('description').optional().notEmpty().withMessage('hasTVA is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors(errors.array()));
    }
    next();
  }
];

export const updateArticleFamily = [
  body('name').optional().notEmpty().withMessage('name is required'),
  body('code').optional().notEmpty().withMessage('code is required'),
  body('description').optional().notEmpty().withMessage('hasTVA is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors(errors.array()));
      }
      next();
    }
  ];