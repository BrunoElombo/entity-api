import { 
    createEntityBankAccountService, 
    deleteEntityBankAccountService, 
    getAllEntityBankAccountService, 
    getEntityBankAccountByIdService, 
    getEntityBankAccountsByParams, 
    updateEntityBankAccountService } from "../services/entityBankAccount.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createEntityBankAccountController = async (req, res) => {
    try {
        let entityAccount = await createEntityBankAccountService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(entityAccount);
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
export const getEntityBankAccountByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let entityAccount = await getEntityBankAccountByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(entityAccount)
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
export const getAllEntityBankAccountController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let entityBanks = await getEntityBankAccountsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(entityBanks)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let entityBanks = await getAllEntityBankAccountService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(entityBanks)
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
export const updateEntityBankAccountController = async (req, res) => {
    try {
        let entityAccount = await updateEntityBankAccountService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(entityAccount);
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
export const deleteEntityBankAccountController = async (req, res) => {
    try {
        let entityAccount = await deleteEntityBankAccountService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(entityAccount)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
