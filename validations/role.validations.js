import { body, validationResult } from 'express-validator';

export const createRole = [
  body('roleName').notEmpty().withMessage('roleName is required'),
  body('displayName').notEmpty().withMessage('displayName is required'),
  body('description').optional().notEmpty().withMessage('description is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateRole = [
    body('roleName').optional().notEmpty().withMessage('roleName is required'),
    body('displayName').optional().notEmpty().withMessage('displayName is required'),
    body('description').optional().notEmpty().withMessage('description is required'),
    body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];