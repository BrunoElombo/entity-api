import { 
    createShiftService, 
    deleteShiftService, 
    getAllShiftService, 
    getShiftByIdService, 
    getShiftsByParams, 
    updateShiftService } from "../services/shift.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createShiftController = async (req, res) => {
    try {
        let shift = await createShiftService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(shift);
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
export const getShiftByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let shift = await getShiftByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(shift)
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
export const getAllShiftsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let shifts = await getShiftsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(shifts)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let shifts = await getAllShiftService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(shifts)
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
export const updateShiftController = async (req, res) => {
    try {
        let shift = await updateShiftService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(shift);
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
export const deleteShiftController = async (req, res) => {
    try {
        let shift = await deleteShiftService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(shift)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
