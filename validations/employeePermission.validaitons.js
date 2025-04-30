import { body, validationResult } from 'express-validator';

export const createEmployeePermission = [
  body('employeeId').notEmpty().withMessage('employeeId is required'),
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

export const updateEmployeePermission = [
    body('employeeId').optional().notEmpty().withMessage('employeeId is required'),
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