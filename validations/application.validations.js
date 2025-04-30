import { body, validationResult } from 'express-validator';

export const createApplication = [
  body('name').notEmpty().withMessage('name is required'),
  body('url').notEmpty().withMessage('url is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateApplication = [
    body('name').notEmpty().withMessage('name is required'),
    body('url').notEmpty().withMessage('url is required'),
    body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];