import { body, validationResult } from 'express-validator';

export const createApplicationPermission = [
  body('applicationId').notEmpty().withMessage('applicationId is required'),
  body('permissionId').notEmpty().withMessage('permissionId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateApplicationPermission = [
    body('applicationId').optional().notEmpty().withMessage('applicationId is required'),
    body('permissionId').optional().notEmpty().withMessage('permissionId is required'),
    body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];