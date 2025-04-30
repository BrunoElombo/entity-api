import { 
    createDistrictService, 
    deleteDistrictService, 
    getAllDistrictsService, 
    getDistrictByIdService, 
    getDistrictsByParams, 
    updateDistrictService } from "../services/district.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createDistrictController = async (req, res) => {
    try {
        let district = await createDistrictService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(district);
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
export const getDistrictByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let district = await getEchelonByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(district)
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
export const getAllDistrictsController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let districts = await getDistrictsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(districts)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let districts = await getAllDistrictsService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(districts)
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
export const updateDistrictController = async (req, res) => {
    try {
        let district = await updateDistrictService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(district);
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
export const deleteDistrictController = async (req, res) => {
    try {
        let district = await deleteDistrictService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(district)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
