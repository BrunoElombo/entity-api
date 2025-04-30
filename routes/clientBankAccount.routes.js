// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createClientBankAccountController, 
    deleteClientBankAccountController, 
    getAllClientBankAccountController, 
    getClientBankAccountByIdController, 
    updateClientBankAccountController 
} from "../controllers/clientBankAccount.controllers.js";
import {createClientBankAccount, updateClientBankAccount} from '../validations/clientBankAccount.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllClientBankAccountController);
routes.get('/:id', getClientBankAccountByIdController);
routes.post('/', createClientBankAccount, createClientBankAccountController);
routes.patch('/:id', updateClientBankAccount, updateClientBankAccountController);
routes.delete('/:id', deleteClientBankAccountController);


export default routes;
