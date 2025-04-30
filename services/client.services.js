import {prisma} from '../config/config.js';
const clientClient = prisma.customer;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a client
 * @param body 
 * @returns 
 */
export const createClientService = async (body)=>{
    try {
        let client = await clientClient.create({
            data:body
        });
        return client;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllClientsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let clients = await clientClient.findMany({
            where:{isActive:true},
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await clientClient.count({
            where:{isActive:true}
        });
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / LIMIT),
            // total,
            data: clients,
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
export const getClientByIdService = async(id) =>{
    try {
        let client = await clientClient.findFirst({
            where:{id, isActive: true},
        });
        if (!client) throw new Error(`No client found.`)
        return client;
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
export const getClientsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let client = await clientClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await clientClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: client,
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
export const updateClientService = async (id, body) =>{
    try {
        let client = await clientClient.update({
            where:{id},
            data:body
        });
        return client;
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
export const deleteClientServices = async (id) =>{
    try {
        let client = await clientClient.update({
            where: {id},
            data:{isActive:false}
        });
        return client
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}