import { Router } from "express";
import { 
    createCategoryController, 
    deleteCategoryController, 
    getAllCategoriesController, 
    getCategoryByIdController, 
    updateCategoryController 
} from "../controllers/category.controllers.js";
import {createCategory, updateCategory} from '../validations/category.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllCategoriesController);
routes.get('/:id', getCategoryByIdController);
routes.post('/', createCategory, createCategoryController);
routes.patch('/:id', updateCategory, updateCategoryController);
routes.delete('/:id', deleteCategoryController);


export default routes;
