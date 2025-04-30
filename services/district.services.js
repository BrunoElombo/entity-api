import {prisma} from '../config/config.js';
const districtClient = prisma.district;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a district
 * @param body 
 * @returns 
 */
export const createDistrictService = async (body)=>{
    try {
        let district = await districtClient.create({
            data:body
        });
        return district;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllDistrictsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let districts = await districtClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            },
            include:{
                country:true
            }
        });
        const total = await districtClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: districts,
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
export const getDistrictByIdService = async(id) =>{
    try {
        let district = await districtClient.findFirst({
            where:{id, isActive: true},
            include:{
                country:true
            }
        });
        if (!district) throw new Error(`No district found.`)
        return district;
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
export const getDistrictsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let districts = await districtClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            },
            include:{
                country:true
            }
        });
        const total = await districtClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: districts,
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
export const updateDistrictService = async (id, body) =>{
    try {
        let district = await districtClient.update({
            where:{id},
            data:body
        });
        return district;
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
export const deleteDistrictService = async (id) =>{
    try {
        let district = await districtClient.update({
            where: {id},
            data:{isActive:false}
        });
        return district
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}