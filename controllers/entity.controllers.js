import { 
    createEntityService, 
    deleteEntityServices, 
    getAllEntitiesService, 
    getEntityByIdService, 
    getEntitiesByParams, 
    updateEntityService } from "../services/entity.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEntityController = async (req, res) => {
    try {
        let entity = await createEntityService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(entity);
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
export const getEntityByIdController = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let entity = await getEntityByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(entity)
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
export const getAllEntitiesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  entities = await getEntitiesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(entities)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let entities = await getAllEntitiesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(entities)
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
export const updateEntityController = async (req, res) => {
    try {
        let entity = await updateEntityService(req.params.id, req.body);
        res
        .send(entity)
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
export const deleteEntityController = async (req, res) => {
    try {
        let entity = await deleteEntityServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(entity)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
