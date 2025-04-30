import {prisma} from '../config/config.js';
const articleFamilyClient = prisma.article_family;


const LIMIT = 100;
const ORDER ="asc";
const SORT_BY = "name"

/**
 * Create article family
 * @param body 
 * @returns 
 */
export const createArticleFamilyService = async (body)=>{
    try {
        let articleFamily = await articleFamilyClient.create({
            data:body
        });
        return articleFamily;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * Get all the articles
 * @returns 
 */
export const getAllArticleFamiliesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let articleFamilies = await articleFamilyClient.findMany({
            where:{isActive:true},
            // skip: parseInt(skip),
            // take: parseInt(LIMIT),
            orderBy:{
                name:'asc'
            }
        });
        const total = await articleFamilyClient.count({
            where:{isActive:true}
        });
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / LIMIT),
            // total,
            data: articleFamilies,
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
export const getArticleFamilyByIdService = async(id) =>{
    try {
        let articleFamily = await articleFamilyClient.findFirst({
            where:{id, isActive: true},
        });
        if (!article) throw new Error(`No article found.`)
        return articleFamily;
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
export const getArticleFamiliesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let articles = await articleFamilyClient.findMany({
            where:queries,
            // skip: parseInt(skip),
            // take: parseInt(limit),
            orderBy:{
                name:'asc'
            }
        });
        const total = await articleFamilyClient.count({
            where:{isActive:true}
        });;
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / limit),
            // total,
            data: articleFamilies,
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
export const updateArticleFamilyService = async (id, body) =>{
    try {
        let articleFamily = await articleFamilyClient.update({
            where:{id},
            data:body
        });
        return articleFamily;
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
export const deleteArticleFamilyServices = async (id) =>{
    try {
        let articleFamily = await articleFamilyClient.update({
            where: {id},
            data:{isActive:false}
        });
        return articleFamily
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}