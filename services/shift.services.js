import {prisma} from '../config/config.js';
const shiftClient = prisma.shift;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a shift
 * @param body 
 * @returns 
 */
export const createShiftService = async (body)=>{
    try {
        let shift = await shiftClient.create({
            data:body
        });
        return shift;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllShiftService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let shifts = await shiftClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                entity:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await shiftClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: shifts,
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
export const getShiftByIdService = async(id) =>{
    try {
        let shift = await shiftClient.findFirst({
            where:{id, isActive: true},
        });
        if (!shift) throw new Error(`No shift found.`)
        return shift;
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
export const getShiftsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let shifts = await shiftClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await shiftClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: shifts,
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
export const updateShiftService = async (id, body) =>{
    try {
        let shift = await shiftClient.update({
            where:{id},
            data:body
        });
        return shift;
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
export const deleteShiftService = async (id) =>{
    try {
        let shift = await shiftClient.update({
            where: {id},
            data:{isActive:false}
        });
        return shift
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}