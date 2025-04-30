import { Router } from "express";
import { 
    createArticleFamilyController, 
    deleteArticleFamilyController, 
    getAllArticleFamiliesController, 
    getArticleFamilyByIdController, 
    updateArticleFamilyController 
} from "../controllers/articleFamily.controllers.js";
import { createArticleFamily, updateArticleFamily } from '../validations/articleFamily.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllArticleFamiliesController);
routes.get('/:id', getArticleFamilyByIdController);
routes.post('/', createArticleFamily, createArticleFamilyController);
routes.patch('/:id', updateArticleFamily,  updateArticleFamilyController);
routes.delete('/:id', deleteArticleFamilyController);

export default routes;
