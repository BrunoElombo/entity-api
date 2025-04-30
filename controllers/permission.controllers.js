import { 
    createPermissionService, 
    deletePermissionServices, 
    getAllPermissionsService, 
    getPermissionByIdService, 
    getPermissionsByParams, 
    updatePermissionService } from "../services/permission.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createPermissionController = async (req, res) => {
    try {
        let permission = await createPermissionService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(permission);
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
export const getPermissionByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let permission = await getPermissionByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(permission)
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
export const getAllPermissionsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  permissions = await getPermissionsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(permissions)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let permissions = await getAllPermissionsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(permissions)
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
export const updatePermissionController = async (req, res) => {
    try {
        let permission = await updatePermissionService(req.params.id, req.body);
        res
        .send(permission)
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
export const deletePermissionController = async (req, res) => {
    try {
        let permission = await deletePermissionServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(permission)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
