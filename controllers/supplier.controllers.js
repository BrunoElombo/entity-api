import { 
    createSupplierService, 
    deleteSupplierService, 
    getAllSuppliersService, 
    getSupplierByIdService, 
    getSuppliersByParams, 
    updateSupplierService } from "../services/supplier.services.js";
import HTTP_STATUS from "../utils/http.utils.js";


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const createSupplierController = async (req, res) => {
    try {
        let supplier = await createSupplierService(req.body);
        res
        .status(HTTP_STATUS.CREATED.statusCode)
        .send(supplier);
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
export const getSupplierByIdController = async (req, res) => {
    let { id } = req.params;

    if(!id){
        res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
        return;
    }

    try {
        let supplier = await getSupplierByIdService(id);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(supplier)
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
export const getAllSuppliersController = async(req, res) => {
    
    if(Object.keys(req.query).length !== 0 && req.query.constructor === Object){
        try {
            let suppliers = await getSuppliersByParams(req.query);
            res
            .status(HTTP_STATUS.OK.statusCode)
            .send(suppliers)
            return;
        } catch (error) {
          console.log(error);
          res.sendStatus(HTTP_STATUS.NOT_FOUND.statusCode);
          return;
        }
    }

    try {
        let suppliers = await getAllSuppliersService(req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(suppliers)
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
export const updateSupplierController = async (req, res) => {
    try {
        let supplier = await updateSupplierService(req.params.id, req.body);
        res
        .status(HTTP_STATUS.OK.statusCode)
        .send(supplier);
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
export const deleteSupplierController = async (req, res) => {
    try {
        let supplier = await deleteSupplierService(req.params.id);
        res
        .status(HTTP_STATUS.NO_CONTENT.statusCode)
        .send(supplier)
        return;
    } catch (error) {
        console.log(error);
        res
        .sendStatus(HTTP_STATUS.BAD_REQUEST.statusCode);
        return;
    }
}
