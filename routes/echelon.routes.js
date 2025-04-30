// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createEchelonController, 
    deleteEchelonController, 
    getAllEchelonController,
    getEchelonByIdController, 
    updateEchelonController 
} from "../controllers/echelon.controllers.js";
import {createEchelon, updateEchelon} from '../validations/echelon.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEchelonController);
routes.get('/:id', getEchelonByIdController);
routes.post('/', createEchelon, createEchelonController);
routes.patch('/:id', updateEchelon, updateEchelonController);
routes.delete('/:id', deleteEchelonController);


export default routes;
