import { body, validationResult } from 'express-validator';

export const createPermissionRole = [
  body('permissionId').notEmpty().withMessage('permissionId is required'),
  body('roleId').notEmpty().withMessage('roleId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updatePermissionRole = [
    body('permissionId').optional().notEmpty().withMessage('permissionId is required'),
    body('roleId').optional().notEmpty().withMessage('roleId is required'),
    body('createdBy').optional().notEmpty().withMessage('createdBy is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];