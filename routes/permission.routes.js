import { Router } from "express";
import { 
    createPermissionController, 
    deletePermissionController, 
    getAllPermissionsController, 
    getPermissionByIdController, 
    updatePermissionController 
} from "../controllers/permission.controllers.js";
import {createPermission, updatePermission} from '../validations/permission.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllPermissionsController);
routes.get('/:id', getPermissionByIdController);
routes.post('/', createPermission, createPermissionController);
routes.patch('/:id', updatePermission, updatePermissionController);
routes.delete('/:id', deletePermissionController);

export default routes;