import { Router } from "express";
import { 
    createEmployeeController, 
    deleteEmployeeController, 
    getAllEmployeesController, 
    getEmployeeByIdController, 
    getEmployeePermissionsController, 
    getEmployeeRolesController, 
    updateEmployeeController 
} from "../controllers/employee.controllers.js";
import {createEmployee, updateEmployee} from '../validations/employee.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllEmployeesController);
routes.get('/:id', getEmployeeByIdController);
routes.get('/:id/roles', getEmployeeRolesController);
routes.get('/:id/permissions', getEmployeePermissionsController);
routes.post('/', createEmployee, createEmployeeController);
routes.patch('/:id', updateEmployee, updateEmployeeController);
routes.delete('/:id', deleteEmployeeController);

export default routes;