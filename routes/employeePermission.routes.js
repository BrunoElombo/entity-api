import { Router } from "express";
import { 
    createEmployeePermissionController, 
    deleteEmployeePermissionController, 
    getAllEmployeePermissionsController, 
    getEmployeePermissionByIdController, 
    updateEmployeePermissionController 
} from "../controllers/employeePermission.controllers.js";
import {createEmployeePermission, updateEmployeePermission} from '../validations/employeePermission.validaitons.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEmployeePermissionsController);
routes.get('/:id', getEmployeePermissionByIdController);
routes.post('/', createEmployeePermission, createEmployeePermissionController);
routes.patch('/:id', updateEmployeePermission, updateEmployeePermissionController);
routes.delete('/:id', deleteEmployeePermissionController);

export default routes