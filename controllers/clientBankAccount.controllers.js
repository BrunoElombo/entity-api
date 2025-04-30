import { 
    createClientBankAccountService, 
    deleteClientBankAccountServices, 
    getAllClientBankAccountService, 
    getClientBankAccountByIdService, 
    getClientBankAccountsByParams, 
    updateClientBankAccountService } from "../services/clientBankAccount.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createClientBankAccountController = async (req, res) => {
    try {
        let bankAccount = await createClientBankAccountService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(bankAccount);
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
export const getClientBankAccountByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let client = await getClientBankAccountByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(client)
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
export const getAllClientBankAccountController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let bankAccounts = await getClientBankAccountsByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(bankAccounts)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let bankAccounts = await getAllClientBankAccountService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(bankAccounts)
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
export const updateClientBankAccountController = async (req, res) => {
    try {
        let bankAccount = await updateClientBankAccountService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(bankAccount);
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
export const deleteClientBankAccountController = async (req, res) => {
    try {
        let client = await deleteClientBankAccountServices(req.params.id);
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
