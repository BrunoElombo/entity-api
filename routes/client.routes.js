// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createClientController, 
    deleteClientController, 
    getAllClientController, 
    getClientByIdController, 
    updateClientController 
} from "../controllers/client.controllers.js";
import {createClient, updateClient} from '../validations/client.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllClientController);
routes.get('/:id', getClientByIdController);
routes.post('/', createClient, createClientController);
routes.patch('/:id', updateClient, updateClientController);
routes.delete('/:id', deleteClientController);

export default routes;
