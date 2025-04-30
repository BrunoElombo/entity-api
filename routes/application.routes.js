import { Router } from "express";
import { 
    createApplicationController, 
    deleteApplicationController, 
    getAllApplicationsController, 
    getApplicaitionByIdController, 
    updateApplicationController 
} from "../controllers/application.controllers.js";
import { createApplication, updateApplication } from '../validations/application.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllApplicationsController);
routes.get('/:id', getApplicaitionByIdController);
routes.post('/', createApplicationController);
routes.patch('/:id',  updateApplicationController);
routes.delete('/:id', deleteApplicationController);


export default routes;
