import { Router } from "express";
import { 
    createShiftController, 
    deleteShiftController, 
    getAllShiftsController, 
    getShiftByIdController, 
    updateShiftController 
} from "../controllers/shift.controllers.js";
import {createShift, updateShift} from '../validations/shift.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllShiftsController);
routes.get('/:id', getShiftByIdController);
routes.post('/', createShift, createShiftController);
routes.patch('/:id', updateShift, updateShiftController);
routes.delete('/:id', deleteShiftController);


export default routes;
