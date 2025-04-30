import { Router } from "express";
import { 
    createApplicationPermissionController, 
    deleteApplicationPermissionController, 
    getAllApplicationPermissionsController, 
    getApplicationPermissionByIdController, 
    updateApplicationPermissionController 
} from "../controllers/applicationPermission.controllers.js";
import {createApplicationPermission, updateApplicationPermission} from '../validations/applicationPermission.validation.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllApplicationPermissionsController);
routes.get('/:id', getApplicationPermissionByIdController);
routes.post('/', createApplicationPermission, createApplicationPermissionController);
routes.patch('/:id', updateApplicationPermission, updateApplicationPermissionController);
routes.delete('/:id', deleteApplicationPermissionController);

export default routes;