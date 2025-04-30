import { body, validationResult } from 'express-validator';

export const createTown = [
  body('name').notEmpty().withMessage('name is required'),
  body('districtId').notEmpty().withMessage('districtId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateTown = [
    body('name').optional().notEmpty().withMessage('name should not be left empty'),
    body('districtId').optional().notEmpty().withMessage('districtId should not be left empty'),
    body('createdBy').optional().notEmpty().withMessage('createbBy should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];