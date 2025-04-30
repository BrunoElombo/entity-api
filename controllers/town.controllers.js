import { 
    createTownService, 
    deleteTownService, 
    getAllTownsService, 
    getTownByIdService, 
    getTownsByParams, 
    updateTownService } from "../services/town.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createTownController = async (req, res) => {
    try {
        let town = await createTownService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(town);
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
export const getTownByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let town = await getTownByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(town)
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
export const getAllTownsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let towns = await getTownsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(towns)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let town = await getAllTownsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(town)
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
export const updateTownController = async (req, res) => {
    try {
        let town = await updateTownService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(town);
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
export const deleteTownController = async (req, res) => {
    try {
        let town = await deleteTownService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(town)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
