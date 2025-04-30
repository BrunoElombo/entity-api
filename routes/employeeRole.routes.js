import { Router } from "express";
import { 
    createEmployeeRoleController, 
    deleteEmployeeRoleController, 
    getAllEmployeeRolesController, 
    getEmployeeRoleByIdController, 
    updateEmployeeRoleController 
} from "../controllers/employeeRole.controllers.js";
import {createEmployeeRole, updateEmployeeRole} from '../validations/employeeRole.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEmployeeRolesController);
routes.get('/:id', getEmployeeRoleByIdController);
routes.post('/', createEmployeeRole, createEmployeeRoleController);
routes.patch('/:id', updateEmployeeRole, updateEmployeeRoleController);
routes.delete('/:id', deleteEmployeeRoleController);

export default routes;