import { Router } from "express";
import { 
    createSiteController, 
    deleteSiteController, 
    getAllSitesController, 
    getSiteByIdController, 
    updateSiteController 
} from "../controllers/site.controllers.js";
import {createSite, updateSite} from '../validations/site.validations.js'

const routes = Router();

// routes.use('*', verifyToken)
routes.get('/', getAllSitesController);
routes.get('/:id', getSiteByIdController);
routes.post('/', createSite, createSiteController);
routes.patch('/:id', updateSite, updateSiteController);
routes.delete('/:id', deleteSiteController);


export default routes;
