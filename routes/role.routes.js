import { Router } from "express";
import { 
    createRoleController, 
    deleteRoleController, 
    getAllRolesController, 
    getRoleByIdController, 
    updateRoleController 
} from "../controllers/role.controllers.js";
import {createRole, updateRole} from '../validations/role.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllRolesController);
routes.get('/:id', getRoleByIdController);
routes.post('/', createRole, createRoleController);
routes.patch('/:id', updateRole, updateRoleController);
routes.delete('/:id', deleteRoleController);

export default routes;