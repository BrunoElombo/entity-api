import { Router } from "express";
import { 
    createArticleController, 
    deleteArticleController, 
    getAllArticlesController, 
    getArticleByIdController, 
    updateArticleController 
} from "../controllers/article.controllers.js";
import { createArticle, updateArticle } from '../validations/article.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllArticlesController);
routes.get('/:id', getArticleByIdController);
routes.post('/', createArticle, createArticleController);
routes.patch('/:id', updateArticle,  updateArticleController);
routes.delete('/:id', deleteArticleController);

export default routes;
