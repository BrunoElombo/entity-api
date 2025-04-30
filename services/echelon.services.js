import {prisma} from '../config/config.js';
const echelonClient = prisma.echelon;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a echelon
 * @param body 
 * @returns 
 */
export const createEchelonService = async (body)=>{
    try {
        let echelon = await echelonClient.create({
            data:body
        });
        return echelon;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEchelonsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let echelons = await echelonClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await echelonClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: echelons,
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
export const getEchelonByIdService = async(id) =>{
    try {
        let echelon = await echelonClient.findFirst({
            where:{id, isActive: true},
        });
        if (!echelon) throw new Error(`No echelon found.`)
        return echelon;
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
export const getEchelonByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let echelon = await echelonClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await echelonClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: echelon,
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
export const updateEchelonService = async (id, body) =>{
    try {
        let echelon = await echelonClient.update({
            where:{id},
            data:body
        });
        return echelon;
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
export const deleteEchelonServices = async (id) =>{
    try {
        let echelon = await consommableClient.update({
            where: {id},
            data:{isActive:false}
        });
        // let town = await townClient.delete({
        //     where: {id}
        // });
        return echelon
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}