import { 
    createFunctionService, 
    deleteFunctionService, 
    getAllFunctionsService, 
    getFunctionByIdService, 
    getFunctionsByParams, 
    updateFunctionService } from "../services/function.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createFunctionController = async (req, res) => {
    try {
        let functions = await createFunctionService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(functions);
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
export const getFunctionByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let functions = await getFunctionByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(functions)
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
export const getAllFunctionController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let functions = await getFunctionsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(functions)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let functions = await getAllFunctionsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(functions)
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
export const updateFunctionController = async (req, res) => {
    try {
        let functions = await updateFunctionService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(functions);
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
export const deleteFunctionController = async (req, res) => {
    try {
        let functions = await deleteFunctionService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(functions)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
