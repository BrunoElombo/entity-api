import { 
    createEchelonService, 
    deleteEchelonServices, 
    getAllEchelonsService, 
    getEchelonByIdService, 
    getEchelonByParams, 
    updateEchelonService } from "../services/echelon.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEchelonController = async (req, res) => {
    try {
        let echelon = await createEchelonService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(echelon);
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
export const getEchelonByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let echelon = await getEchelonByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(echelon)
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
export const getAllEchelonController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let echelons = await getEchelonByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(echelons)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let echelons = await getAllEchelonsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(echelons)
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
export const updateEchelonController = async (req, res) => {
    try {
        let echelon = await updateEchelonService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(echelon);
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
export const deleteEchelonController = async (req, res) => {
    try {
        let echelon = await deleteEchelonServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(echelon)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
