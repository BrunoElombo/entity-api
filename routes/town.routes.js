// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createTownController, 
    deleteTownController, 
    getAllTownsController,
    getTownByIdController, 
    updateTownController 
} from "../controllers/town.controllers.js";
import {createTown, updateTown} from '../validations/town.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllTownsController);
routes.get('/:id', getTownByIdController);
routes.post('/', createTown, createTownController);
routes.patch('/:id', updateTown, updateTownController);
routes.delete('/:id', deleteTownController);


export default routes;
