import { 
    createBankService, 
    deleteBankServices, 
    getAllBanksService, 
    getBankByIdService, 
    getBanksByParams, 
    updateBankService } from "../services/bank.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createBankController = async (req, res) => {
    try {
        let bank = await createBankService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(bank);
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
export const getBankByIdController = async (req, res) => {
    let { id } = req.params;
    console.log(id);

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let bank = await getBankByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(bank)
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
export const getAllBanksController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let  banks = await getBanksByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(banks)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let banks = await getAllBanksService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(banks)
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
export const updateBankController = async (req, res) => {
    try {
        let bank = await updateBankService(req.params.id, req.body);
        res
        .send(bank)
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
export const deleteBankController = async (req, res) => {
    try {
        let bank = await deleteBankServices(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(bank)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
