// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createGradeController, 
    deleteGradeController, 
    getAllGradeController,
    getGradeByIdController, 
    updateGradeController 
} from "../controllers/grade.controllers.js";
import {createGrade, updateGrade} from '../validations/grade.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllGradeController);
routes.get('/:id', getGradeByIdController);
routes.post('/', createGrade, createGradeController);
routes.patch('/:id', updateGrade, updateGradeController);
routes.delete('/:id', deleteGradeController);


export default routes;
