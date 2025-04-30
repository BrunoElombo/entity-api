import { 
    createEmployeeRoleService, 
    deleteEmployeeRoleServices, 
    getAllEmployeeRolesService, 
    getEmployeeRoleByIdService, 
    getEmployeeRolesByParams, 
    updateEmployeeRoleService } from "../services/employeeRole.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEmployeeRoleController = async (req, res) => {
    try {
        let employeeRole = await createEmployeeRoleService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(employeeRole);
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
export const getEmployeeRoleByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let employeeRole = await getEmployeeRoleByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employeeRole)
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
export const getAllEmployeeRolesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  employeeRoles = await getEmployeeRolesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(employeeRoles)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let employeeRoles = await getAllEmployeeRolesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employeeRoles)
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
export const updateEmployeeRoleController = async (req, res) => {
    try {
        let employeeRole = await updateEmployeeRoleService(req.params.id, req.body);
        res
        .send(employeeRole)
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
export const deleteEmployeeRoleController = async (req, res) => {
    try {
        let employeeRole = await deleteEmployeeRoleServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(employeeRole)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
