import {prisma} from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';


const functionClient = prisma.renamedfunction;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a function
 * @param body 
 * @returns 
 */
export const createFunctionService = async (body)=>{
    
    try {
        let functions = await functionClient.create({
            data:{id: uuidv4(), updateAt:new Date().toISOString(), ...body}
        });
        return functions;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllFunctionsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let functions = await functionClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await functionClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: functions,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`)
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const getFunctionByIdService = async(id) =>{
    try {
        let functions = await functionClient.findFirst({
            where:{id, isActive: true},
        });
        if (!functions) throw new Error(`No function found.`)
        return functions;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param request 
 * @returns 
 */
export const getFunctionsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let functions = await functionClient.findMany({
            where:{...queries, isActive:true},
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await functionClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: functions,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param id 
 * @param body 
 * @returns 
 */
export const updateFunctionService = async (id, body) =>{
    try {
        let functions = await functionClient.update({
            where:{id},
            data:body
        });
        return functions;
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`);
    }
}

/**
 * 
 * @param id 
 * @returns 
 */
export const deleteFunctionService = async (id) =>{
    try {
        let functions = await functionClient.update({
            where: {id},
            data:{isActive:false}
        });
        return functions
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}