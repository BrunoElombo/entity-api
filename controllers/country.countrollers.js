import { 
    createCountryService, 
    deleteCountryServices, 
    getAllCountriesService, 
    getCountryByIdService, 
    getCountryByParams, 
    updateCountryService } from "../services/country.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createCountryController = async (req, res) => {
    try {
        let country = await createCountryService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(country);
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
export const getCountryByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let country = await getCountryByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(country)
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
export const getAllCountriesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let countries = await getCountryByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(countries)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let countries = await getAllCountriesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(countries)
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
export const updateCountryController = async (req, res) => {
    try {
        let country = await updateCountryService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(country);
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
export const deleteCountryController = async (req, res) => {
    try {
        let country = await deleteCountryServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(country)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
