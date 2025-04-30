import { 
    createApplicationService, 
    deleteApplicationServices, 
    getAllApplicationsService, 
    getApplicationByIdService, 
    getApplicationsByParams, 
    updateApplicationService } from "../services/application.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createApplicationController = async (req, res) => {
    try {
        let bank = await createApplicationService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(bank);
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
export const getApplicaitionByIdController = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let application = await getApplicationByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(application)
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
export const getAllApplicationsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  applications = await getApplicationsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(applications)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let applications = await getAllApplicationsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(applications)
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
export const updateApplicationController = async (req, res) => {
    try {
        let application = await updateApplicationService(req.params.id, req.body);
        res
        .send(application)
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
export const deleteApplicationController = async (req, res) => {
    try {
        let application = await deleteApplicationServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(application)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
