import { body, validationResult } from 'express-validator';

export const createClientBankAccount = [
  body('accountNumber').notEmpty().withMessage('accountNumber is required'),
  body('bankId').notEmpty().withMessage('bankId is required'),
  body('clientId').notEmpty().withMessage('clientId is required'),
  body('createdBy').notEmpty().withMessage('createdBy is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateClientBankAccount = [
    body('accountNumber').optional().notEmpty().withMessage('accountNumber should not be left empty'),
    body('bankId').optional().notEmpty().withMessage('bankId should not be left empty'),
    body('clientId').optional().notEmpty().withMessage('clientId should not be left empty'),
    body('createdBy').optional().notEmpty().withMessage('createdBy should not be left empty'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];