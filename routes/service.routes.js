// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createServiceController, 
    deleteServiceController, 
    getAllServiceController,
    getServiceByIdController, 
    updateServiceController 
} from "../controllers/service.controllers.js";
import {createService, updateService} from '../validations/service.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllServiceController);
routes.get('/:id', getServiceByIdController);
routes.post('/', createService, createServiceController);
routes.patch('/:id', updateService, updateServiceController);
routes.delete('/:id', deleteServiceController);


export default routes;
