import { body, validationResult } from 'express-validator';

export const createSite = [
  body('name').notEmpty().withMessage('name is required'),
  body('entityId').notEmpty().withMessage('entityId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateSite = [
    body('name').notEmpty().withMessage('name is required'),
    body('entityId').notEmpty().withMessage('entityId is required'),
    body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];