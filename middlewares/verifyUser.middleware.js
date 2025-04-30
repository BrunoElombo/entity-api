import HTTP_STATUS from '../utils/http.utils.js';
import { USERS_API } from '../config/config.js';

export const verifyUserId = async (req, res, next) =>{
    try {
        let {userId} = req.body
        let result = await fetch(`${USERS_API}/api/users/${userId}`);
        if(result.status != HTTP_STATUS.OK.statusCode) throw new Error("Invalid user token");
        next();
    } catch (error) {
        console.error(error);
        return res
        .status(HTTP_STATUS.BAD_REQUEST.statusCode)
        .send(HTTP_STATUS.BAD_REQUEST.message);
    }
}


export const verifyCreatedBy = async (req, res, next) =>{
    try {
        let {createdBy} = req.body
        let result = await fetch(`${USERS_API}/api/users/${userId}`);
        if(result.status != HTTP_STATUS.OK.statusCode) throw new Error("Invalid user token");
        next();
    } catch (error) {
        console.error(error);
        return res
        .status(HTTP_STATUS.BAD_REQUEST.statusCode)
        .send(HTTP_STATUS.BAD_REQUEST.message);
    }
}