// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createEntityController, 
    deleteEntityController, 
    getAllEntitiesController,
    getEntityByIdController, 
    updateEntityController 
} from "../controllers/entity.controllers.js";
import {createEntity, updateEntity} from '../validations/entity.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEntitiesController);
routes.get('/:id', getEntityByIdController);
routes.post('/', createEntity, createEntityController);
routes.patch('/:id', updateEntity, updateEntityController);
routes.delete('/:id', deleteEntityController);


export default routes;
