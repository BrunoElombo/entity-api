import { body, validationResult } from 'express-validator';

export const createEntity = [
  body('name').notEmpty().withMessage('name is required'),
  body('localisation').notEmpty().withMessage('localisation is required'),
  body('phone').notEmpty().withMessage('phone is required'),
  body('townId').notEmpty().withMessage('townId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateEntity = [
    body('name').optional().notEmpty().withMessage('Name should not be left empty'),
    body('localisation').optional().notEmpty().withMessage('localisation should not be left empty'),
    body('phone').optional().notEmpty().withMessage('phone should not be left empty'),
    body('townId').optional().notEmpty().withMessage('townId should not be left empty'),
    body('createdBy').optional().notEmpty().withMessage('townId should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];