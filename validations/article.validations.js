import { body, validationResult } from 'express-validator';

export const createArticle = [
  body('name').notEmpty().withMessage('name is required'),
  body('price').notEmpty().withMessage('price is required'),
  body('hasTVA').notEmpty().optional().withMessage('hasTVA is required'),
  body('type').notEmpty().withMessage('hasTVA is required'),
  body('idEntity').notEmpty().withMessage('hasTVA is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateArticle = [
    body('name').optional().notEmpty().withMessage('name is required'),
    body('price').optional().notEmpty().withMessage('price is required'),
    body('hasTVA').optional().notEmpty().withMessage('hasTVA is required'),
    body('type').optional().notEmpty().withMessage('hasTVA is required'),
    body('idEntity').optional().notEmpty().withMessage('hasTVA is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];