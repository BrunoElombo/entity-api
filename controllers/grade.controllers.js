import { 
    createGradeService, 
    deleteGradeService, 
    getAllGradesService, 
    getGradeByIdService, 
    getGradeByParams, 
    updateGradeService } from "../services/grade.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createGradeController = async (req, res) => {
    try {
        let grade = await createGradeService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(grade);
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
export const getGradeByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let grade = await getGradeByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(grade)
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
export const getAllGradeController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let grades = await getGradeByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(grades);
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let grades = await getAllGradesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(grades);
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
export const updateGradeController = async (req, res) => {
    try {
        let grade = await updateGradeService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(grade);
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
export const deleteGradeController = async (req, res) => {
    try {
        let entityAccount = await deleteGradeService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(entityAccount);
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
