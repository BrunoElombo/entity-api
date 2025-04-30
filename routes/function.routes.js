// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createFunctionController, 
    deleteFunctionController, 
    getAllFunctionController,
    getFunctionByIdController, 
    updateFunctionController 
} from "../controllers/function.controllers.js";
import {createFunction, updateFunction} from '../validations/function.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllFunctionController);
routes.get('/:id', getFunctionByIdController);
routes.post('/', createFunction, createFunctionController);
routes.patch('/:id', updateFunction, updateFunctionController);
routes.delete('/:id', deleteFunctionController);


export default routes;
