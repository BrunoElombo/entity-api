import { body, validationResult } from 'express-validator';

export const createShift = [
  body('name').notEmpty().withMessage('name is required'),
  body('startTime').notEmpty().withMessage('startTime is required'),
  body('endTime').notEmpty().withMessage('endTime is required'),
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

export const updateShift = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    body('startTime').notEmpty().optional().withMessage('startTime is required'),
    body('endTime').notEmpty().optional().withMessage('endTime is required'),
    body('entityId').notEmpty().optional().withMessage('entityId is required'),
    body('createdBy').notEmpty().optional().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];