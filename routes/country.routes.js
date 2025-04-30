// import { userInEntity } from './../middlewares/user.middleware';
// import { verifyToken } from "../middlewares/verifyToken";
import { Router } from "express";
import { 
    createCountryController, 
    deleteCountryController, 
    getAllCountriesController,
    getCountryByIdController, 
    updateCountryController 
} from "../controllers/country.countrollers.js";
import {createCountry, updateCountry} from '../validations/country.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllCountriesController);
routes.get('/:id', getCountryByIdController);
routes.post('/', createCountry, createCountryController);
routes.patch('/:id', updateCountry, updateCountryController);
routes.delete('/:id', deleteCountryController);


export default routes;
