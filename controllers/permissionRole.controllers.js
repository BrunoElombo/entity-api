import { 
    createPermissionRoleService, 
    deletePermissionRoleServices, 
    getAllPermissionRolesService, 
    getPermissionRoleByIdService, 
    getPermissionRolesByParams, 
    updatePermissionRoleService } from "../services/permissionRoles.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createPermissionRoleController = async (req, res) => {
    try {
        let permissionRole = await createPermissionRoleService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(permissionRole);
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
export const getPermissionRoleByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let permissionRole = await getPermissionRoleByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(permissionRole)
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
export const getAllPermissionRolesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  permissionRoles = await getPermissionRolesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(permissionRoles)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let permissionRoles = await getAllPermissionRolesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(permissionRoles)
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
export const updatePermissionRoleController = async (req, res) => {
    try {
        let permissionRole = await updatePermissionRoleService(req.params.id, req.body);
        res
        .send(permissionRole)
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
export const deletePermissionRoleController = async (req, res) => {
    try {
        let permissionRole = await deletePermissionRoleServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(permissionRole)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
