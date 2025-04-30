import { Router } from "express";
import { 
    createPermissionRoleController, 
    deletePermissionRoleController, 
    getAllPermissionRolesController, 
    getPermissionRoleByIdController, 
    updatePermissionRoleController 
} from "../controllers/permissionRole.controllers.js";
import {createPermissionRole, updatePermissionRole} from '../validations/permissionRole.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllPermissionRolesController);
routes.get('/:id', getPermissionRoleByIdController);
routes.post('/', createPermissionRole, createPermissionRoleController);
routes.patch('/:id', updatePermissionRole, updatePermissionRoleController);
routes.delete('/:id', deletePermissionRoleController);

export default routes;