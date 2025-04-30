import { 
    createArticleService, 
    deleteArticleServices, 
    getAllArticlesService, 
    getArticleByIdService, 
    getArticlesByParams, 
    updateArticleService } from "../services/article.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createArticleController = async (req, res) => {
    try {
        let article = await createArticleService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(article);
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
export const getArticleByIdController = async (req, res) => {
    let { id } = req.params;
    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let article = await getArticleByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(article)
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
export const getAllArticlesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  articles = await getArticlesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(articles)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let articles = await getAllArticlesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(articles)
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
export const updateArticleController = async (req, res) => {
    try {
        let article = await updateArticleService(req.params.id, req.body);
        res
        .send(article)
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
export const deleteArticleController = async (req, res) => {
    try {
        let article = await deleteArticleServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(article)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
