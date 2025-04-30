import { 
    createDepartmentService, 
    deleteDepartmentServices, 
    getAllDepartmentsService, 
    getDepartmentByIdService, 
    getDepartmentsByParams, 
    updateDepartmentService } from "../services/department.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createDepartmentController = async (req, res) => {
    try {
        let department = await createDepartmentService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(department);
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
export const getDepartmentByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let department = await getDepartmentByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(department)
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
export const getAllDepartmentsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let departments = await getAllDepartmentsService(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(departments)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let departments = await getAllDepartmentsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(departments)
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
export const updateDepartmentController = async (req, res) => {
    try {
        let department = await updateDepartmentService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(department);
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
export const deleteDepartmentController = async (req, res) => {
    try {
        let client = await deleteDepartmentServices(req.params.id);
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
