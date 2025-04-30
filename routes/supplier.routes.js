import { Router } from "express";
import { 
    createSupplierController, 
    deleteSupplierController, 
    getAllSuppliersController, 
    getSupplierByIdController, 
    updateSupplierController 
} from "../controllers/supplier.controllers.js";
import {createSupplier, updateSupplier} from '../validations/supplier.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllSuppliersController);
routes.get('/:id', getSupplierByIdController);
routes.post('/', createSupplier, createSupplierController);
routes.patch('/:id', updateSupplier, updateSupplierController);
routes.delete('/:id', deleteSupplierController);


export default routes;
