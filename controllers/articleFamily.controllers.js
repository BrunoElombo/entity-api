import { 
    createArticleFamilyService, 
    deleteArticleFamilyServices, 
    getAllArticleFamiliesService, 
    getArticleFamilyByIdService, 
    getArticleFamiliesByParams, 
    updateArticleFamilyService } from "../services/articleFamily.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createArticleFamilyController = async (req, res) => {
    try {
        let articleFamily = await createArticleFamilyService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(articleFamily);
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
export const getArticleFamilyByIdController = async (req, res) => {
    let { id } = req.params;
    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let articleFamily = await getArticleFamilyByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(articleFamily)
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
export const getAllArticleFamiliesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  articleFamilies = await getArticleFamiliesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(articleFamilies)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let articleFamilies = await getAllArticleFamiliesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(articleFamilies)
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
export const updateArticleFamilyController = async (req, res) => {
    try {
        let articleFamily = await updateArticleFamilyService(req.params.id, req.body);
        res
        .send(articleFamily)
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
export const deleteArticleFamilyController = async (req, res) => {
    try {
        let articleFamily = await deleteArticleFamilyServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(articleFamily)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
