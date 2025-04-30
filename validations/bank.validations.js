import { body, validationResult } from 'express-validator';

export const createBank = [
  body('name').notEmpty().withMessage('name is required'),
  body('address').notEmpty().withMessage('address is required'),
  body('phone').notEmpty().withMessage('phone is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateBank = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    body('address').optional().notEmpty().withMessage('address should not be left empty'),
    body('phone').optional().notEmpty().withMessage('phone should not be left empty'),
    body('createdBy').optional().notEmpty().withMessage('createdBy should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];