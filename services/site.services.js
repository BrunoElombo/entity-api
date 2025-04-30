import {prisma} from '../config/config.js';
const siteClient = prisma.site;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create site
 * @param body 
 * @returns 
 */
export const createSiteService = async (body)=>{
    try {
        let site = await siteClient.create({
            data:body
        });
        return site;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllSitesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let sites = await siteClient.findMany({
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
        const total = await siteClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: sites,
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
export const getSiteByIdService = async(id) =>{
    try {
        let site = await siteClient.findFirst({
            where:{id, isActive: true},
        });
        if (!site) throw new Error(`No site found.`);
        return site;
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
export const getSitesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, search, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let sites = await siteClient.findMany({
            where:!search ? queries : {
                name:{
                    contains:search
                },
                isActive:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await siteClient.count();
        return search ? {data: sites} :{
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: sites,
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
export const updateSiteService = async (id, body) =>{
    try {
        let site = await siteClient.update({
            where:{id},
            data:body
        });
        return site;
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
export const deleteSiteServices = async (id) =>{
    try {
        let site = await siteClient.update({
            where: {id},
            data:{isActive:false}
        });
        return site
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}