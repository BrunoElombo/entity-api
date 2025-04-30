// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createEntityBankAccountController, 
    deleteEntityBankAccountController, 
    getAllEntityBankAccountController,
    getEntityBankAccountByIdController, 
    updateEntityBankAccountController 
} from "../controllers/entityBankAccount.controllers.js";
import {createClientBankAccount, updateClientBankAccount} from '../validations/entityBankAccount.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEntityBankAccountController);
routes.get('/:id', getEntityBankAccountByIdController);
routes.post('/', createClientBankAccount, createEntityBankAccountController);
routes.patch('/:id', updateClientBankAccount, updateEntityBankAccountController);
routes.delete('/:id', deleteEntityBankAccountController);


export default routes;
