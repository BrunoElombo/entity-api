import {prisma} from '../config/config.js';
const applicationClient = prisma.application;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create application
 * @param body 
 * @returns 
 */
export const createApplicationService = async (body)=>{
    try {
        let application = await applicationClient.create({
            data:body
        });
        return application;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllApplicationsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let applications = await applicationClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: applications,
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
export const getApplicationByIdService = async(id) =>{
    try {
        let application = await applicationClient.findFirst({
            where:{id, isActive: true},
        });
        if (!application) throw new Error(`No application found.`)
        return application;
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
export const getApplicationsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let applications = await applicationClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: applications,
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
export const updateApplicationService = async (id, body) =>{
    try {
        let application = await applicationClient.update({
            where:{id},
            data:body
        });
        return application;
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
export const deleteApplicationServices = async (id) =>{
    try {
        let application = await applicationClient.update({
            where: {id},
            data:{isActive:false}
        });
        return application
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}