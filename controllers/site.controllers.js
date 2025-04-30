import { 
    createSiteService, 
    deleteSiteServices, 
    getAllSitesService, 
    getSiteByIdService, 
    getSitesByParams, 
    updateSiteService } from "../services/site.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createSiteController = async (req, res) => {
    try {
        let site = await createSiteService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(site);
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
export const getSiteByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let site = await getSiteByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(site)
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
export const getAllSitesController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let sites = await getSitesByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(sites)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let sites = await getAllSitesService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(sites)
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
export const updateSiteController = async (req, res) => {
    try {
        let site = await updateSiteService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(site);
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
export const deleteSiteController = async (req, res) => {
    try {
        let site = await deleteSiteServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(site)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
