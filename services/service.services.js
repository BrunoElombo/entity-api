import {prisma} from '../config/config.js';
const serviceClient = prisma.service;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a service
 * @param body 
 * @returns 
 */
export const createServiceService = async (body)=>{
    try {
        let service = await serviceClient.create({
            data:body
        });
        return service;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllServicesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let services = await serviceClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                department:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await serviceClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: services,
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
export const getServiceByIdService = async(id) =>{
    try {
        let service = await serviceClient.findFirst({
            where:{id, isActive: true},
        });
        if (!service) throw new Error(`No service found.`)
        return service;
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
export const getServicesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let services = await serviceClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await serviceClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: services,
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
export const updateServiceService = async (id, body) =>{
    try {
        let service = await serviceClient.update({
            where:{id},
            data:body
        });
        return service;
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
export const deleteServiceService = async (id) =>{
    try {
        let service = await serviceClient.update({
            where: {id},
            data:{isActive:false}
        });
        return service
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}