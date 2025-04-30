import {prisma} from '../config/config.js';
const townClient = prisma.town;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a town
 * @param body 
 * @returns 
 */
export const createTownService = async (body)=>{
    try {
        let town = await townClient.create({
            data:body
        });
        return town;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllTownsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let towns = await townClient.findMany({
            where:{isActive:true},
            include:{
                district:true
            },
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await townClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: towns,
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
export const getTownByIdService = async(id) =>{
    try {
        let town = await townClient.findFirst({
            where:{id, isActive: true},
        });
        if (!town) throw new Error(`No town found.`)
        return town;
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
export const getTownsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let town = await townClient.findMany({
            where:{...queries, isActive:true},
            include:{
                district:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await townClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: town,
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
export const updateTownService = async (id, body) =>{
    try {
        let town = await townClient.update({
            where:{id},
            data:body
        });
        return town;
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
export const deleteTownService = async (id) =>{
    try {
        let town = await townClient.update({
            where: {id},
            data:{isActive:false}
        });
        // let town = await townClient.delete({
        //     where: {id}
        // });
        return town
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}