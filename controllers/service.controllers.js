import { 
    createServiceService, 
    deleteServiceService, 
    getAllServicesService, 
    getServiceByIdService, 
    getServicesByParams, 
    updateServiceService } from "../services/service.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createServiceController = async (req, res) => {
    try {
        let service = await createServiceService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(service);
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
export const getServiceByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let service = await getServiceByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(service)
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
export const getAllServiceController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let services = await getServicesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(services)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let services = await getAllServicesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(services)
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
export const updateServiceController = async (req, res) => {
    try {
        let service = await updateServiceService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(service);
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
export const deleteServiceController = async (req, res) => {
    try {
        let service = await deleteServiceService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(service)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
