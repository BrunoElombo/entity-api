import { 
    createEmployeeService, 
    deleteEmployeeServices, 
    getAllEmployeesService, 
    getEmployeeByIdService, 
    getEmployeePermissionsService, 
    getEmployeeRolesService, 
    getEmployeesByParams, 
    updateEmployeeService } from "../services/employee.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEmployeeController = async (req, res) => {
    try {
        let employee = await createEmployeeService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(employee);
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
export const getEmployeeByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let employee = await getEmployeeByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employee)
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
export const getAllEmployeesController = async(req, res) => {
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  employees = await getEmployeesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(employees)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let employees = await getAllEmployeesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(employees)
        return
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}

/**
 * Returns the list of employee's roles
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getEmployeeRolesController = async (req, res) =>{
    try {
        let {id} = req.params;

        if(!id) {
            res.
            status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({
                error:true,
                error_list:[
                    {message:'id is required', field:"id"}
                ]
            });
            return;
        }

        let roles = await getEmployeeRolesService(id);
        res.status(HTTP_STATUS.OK.statusCode).send(roles)

    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }
}


export const getEmployeePermissionsController = async (req, res) =>{
    try {
        let {id} = req.params;

        if(!id) {
            res.
            status(HTTP_STATUS.BAD_REQUEST.statusCode)
            .send({
                error:true,
                error_list:[
                    {message:'id is required', field:"id"}
                ]
            });
            return;
        }

        let permissions = await getEmployeePermissionsService(id);
        res.status(HTTP_STATUS.OK.statusCode).send(permissions)

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
 */
export const updateEmployeeController = async (req, res) => {
    try {
        let employee = await updateEmployeeService(req.params.id, req.body);
        res
        .send(employee)
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
export const deleteEmployeeController = async (req, res) => {
    try {
        let employee = await deleteEmployeeServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(employee)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
