import { 
    createEmployeePermissionService, 
    deleteEmployeePermissionServices, 
    getAllEmployeePermissionsService, 
    getEmployeePermissionByIdService, 
    getEmployeePermissionsByParams, 
    updateEmployeePermissionService } from "../services/employeePermission.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEmployeePermissionController = async (req, res) => {
    try {
        let employeePermission = await createEmployeePermissionService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(employeePermission);
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
export const getEmployeePermissionByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let employeePermission = await getEmployeePermissionByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employeePermission)
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
export const getAllEmployeePermissionsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  employeePermissions = await getEmployeePermissionsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(employeePermissions)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let employeePermissions = await getAllEmployeePermissionsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employeePermissions)
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
export const updateEmployeePermissionController = async (req, res) => {
    try {
        let employeePermission = await updateEmployeePermissionService(req.params.id, req.body);
        res
        .send(employeePermission)
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
export const deleteEmployeePermissionController = async (req, res) => {
    try {
        let employeePermission = await deleteEmployeePermissionServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(employeePermission)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
