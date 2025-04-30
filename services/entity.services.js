import {prisma} from '../config/config.js';
const entityClient = prisma.entity;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a entity
 * @param body 
 * @returns 
 */
export const createEntityService = async (body)=>{
    try {
        let entity = await entityClient.create({
            data:body
        });
        return entity;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEntitiesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let entities = await entityClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                towns:true,
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: entities,
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
export const getEntityByIdService = async(id) =>{
    try {
        let entity = await entityClient.findFirst({
            where:{id, isActive: true},
        });
        if (!functions) throw new Error(`No entity found.`)
        return entity;
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
export const getEntitiesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let entities = await entityClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: entities,
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
export const updateEntityService = async (id, body) =>{
    try {
        let entity = await entityClient.update({
            where:{id},
            data:body
        });
        return entity;
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
export const deleteEntityServices = async (id) =>{
    try {
        let functions = await entityClient.update({
            where: {id},
            data:{isActive:false}
        });
        return functions
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}