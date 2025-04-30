import { 
    createClientService, 
    deleteClientServices, 
    getAllClientsService, 
    getClientByIdService, 
    getClientsByParams, 
    updateClientService } from "../services/client.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createClientController = async (req, res) => {
    try {
        let client = await createClientService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(client);
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
export const getClientByIdController = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let client = await getClientByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(client)
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
export const getAllClientController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let clients = await getClientsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(clients)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let clients = await getAllClientsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(clients)
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
export const updateClientController = async (req, res) => {
    try {
        let client = await updateClientService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(client);
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
export const deleteClientController = async (req, res) => {
    try {
        let client = await deleteClientServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(client)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
