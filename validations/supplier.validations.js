import { body, validationResult } from 'express-validator';

export const createSupplier = [
  body('name').notEmpty().withMessage('name is required'),
  body('entityId').notEmpty().withMessage('entityId is required'),
  body('phone').notEmpty().withMessage('phone is required'),
  body('email').notEmpty().withMessage('email is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateSupplier = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    body('entityId').optional().notEmpty().withMessage('entityId is required'),
    body('phone').optional().notEmpty().withMessage('phone should not be left empty'),
    body('email').optional().notEmpty().withMessage('email should not be left empty'),
    body('createdBy').optional().notEmpty().withMessage('createdBy should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];