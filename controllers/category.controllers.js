import { 
    createCategoryService, 
    deleteCategoryServices, 
    getAllCategoriesService, 
    getCategoryByIdService, 
    getCategoriesByParams, 
    updateCategoryService } from "../services/category.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createCategoryController = async (req, res) => {
    try {
        let category = await createCategoryService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(category);
        return;
    } catch (error) {
        console.log(error);
        res.sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return
    }
}

/**
 * 
 * @param req
 * @param res 
 * @returns 
 */
export const getCategoryByIdController = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let category = await getCategoryByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(category)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const getAllCategoriesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let categories = await getCategoriesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(categories)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let categories = await getAllCategoriesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(categories)
        return
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 */
export const updateCategoryController = async (req, res) => {
    try {
        let category = await updateCategoryService(req.params.id, req.body);
        res
        .send(category)
        .status(HTTP_STATUS.OK.statusCode);
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}


/**
 * 
 * @param req 
 * @param res 
 */
export const deleteCategoryController = async (req, res) => {
    try {
        let category = await deleteCategoryServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(category)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
