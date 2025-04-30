import { body, validationResult } from 'express-validator';

export const createEmployee = [
  body('email').notEmpty().withMessage('name is required'),
  body('phone').optional().notEmpty().withMessage('phone is required'),
  body('functionId').notEmpty().withMessage('functionId is required'),
  body('gradeId').notEmpty().withMessage('gradeId is required'),
  body('echelonId').notEmpty().withMessage('echelonId is required'),
  body('categoryId').notEmpty().withMessage('categoryId is required'),
  body('userId').notEmpty().withMessage('userId is required'),
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

export const updateEmployee = [
  body('email').optional().notEmpty().withMessage('name is required'),
  body('phone').optional().notEmpty().withMessage('phone is required'),
  body('functionId').optional().notEmpty().withMessage('functionId is required'),
  body('gradeId').optional().notEmpty().withMessage('gradeId is required'),
  body('echelonId').optional().notEmpty().withMessage('echelonId is required'),
  body('categoryId').optional().notEmpty().withMessage('categoryId is required'),
  body('userId').optional().notEmpty().withMessage('userId is required'),
  body('entityId').optional().notEmpty().withMessage('entityId is required'),
  body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];