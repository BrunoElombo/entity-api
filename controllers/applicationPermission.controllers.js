import { 
    createApplicationPermissionService, 
    deleteApplicationPermissionServices, 
    getAllApplicationPermissionsService, 
    getApplicationPermissionByIdService, 
    getApplicationPermissionsByParams, 
    updateApplicationPermissionService } from "../services/applicationPermission.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createApplicationPermissionController = async (req, res) => {
    try {
        let applicationPermission = await createApplicationPermissionService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(applicationPermission);
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
export const getApplicationPermissionByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let applicationPermission = await getApplicationPermissionByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(applicationPermission)
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
export const getAllApplicationPermissionsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  applicationPermissions = await getApplicationPermissionsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(applicationPermissions)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let applicationPermissions = await getAllApplicationPermissionsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(applicationPermissions)
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
export const updateApplicationPermissionController = async (req, res) => {
    try {
        let applicationPermission = await updateApplicationPermissionService(req.params.id, req.body);
        res
        .send(applicationPermission)
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
export const deleteApplicationPermissionController = async (req, res) => {
    try {
        let applicationPermission = await deleteApplicationPermissionServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(applicationPermission)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
