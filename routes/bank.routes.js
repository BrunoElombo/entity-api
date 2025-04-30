import { Router } from "express";
import { 
    createBankController, 
    deleteBankController, 
    getAllBanksController, 
    getBankByIdController, 
    updateBankController 
} from "../controllers/bank.controllers.js";
import {createBank, updateBank} from '../validations/bank.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllBanksController);
routes.get('/:id', getBankByIdController);
routes.post('/', createBank, createBankController);
routes.patch('/:id', updateBank, updateBankController);
routes.delete('/:id', deleteBankController);


export default routes;
