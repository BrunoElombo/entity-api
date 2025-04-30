// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createDepartmentController, 
    deleteDepartmentController, 
    getAllDepartmentsController,
    getDepartmentByIdController, 
    updateDepartmentController 
} from "../controllers/department.controllers.js";
import {createDepartment, updateDepartment} from '../validations/department.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllDepartmentsController);
routes.get('/:id', getDepartmentByIdController);
routes.post('/', createDepartment, createDepartmentController);
routes.patch('/:id', updateDepartment, updateDepartmentController);
routes.delete('/:id', deleteDepartmentController);


export default routes;
