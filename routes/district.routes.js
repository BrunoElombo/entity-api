import { Router } from "express";
import { 
    createDistrictController, 
    deleteDistrictController, 
    getAllDistrictsController, 
    getDistrictByIdController, 
    updateDistrictController 
} from "../controllers/district.controllers.js";
import {createDistrict, updateDistrict} from '../validations/district.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllDistrictsController);
routes.get('/:id', getDistrictByIdController);
routes.post('/', createDistrict, createDistrictController);
routes.patch('/:id', updateDistrict, updateDistrictController);
routes.delete('/:id', deleteDistrictController);


export default routes;
