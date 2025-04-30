import { 
    createRoleService, 
    deleteRoleServices, 
    getAllRolesService, 
    getRolesByParams, 
    getRoleByIdService, 
    updateRoleService } from "../services/role.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res
 * @returns 
 */
export const createRoleController = async (req, res) => {
    try {
        let role = await createRoleService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(role);
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
export const getRoleByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let role = await getRoleByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(role)
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
export const getAllRolesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  roles = await getRolesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(roles)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let roles = await getAllRolesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(roles)
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
export const updateRoleController = async (req, res) => {
    try {
        let role = await updateRoleService(req.params.id, req.body);
        res
        .send(role)
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
export const deleteRoleController = async (req, res) => {
    try {
        let role = await deleteRoleServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(role)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
