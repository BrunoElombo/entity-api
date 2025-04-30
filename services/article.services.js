import {prisma} from '../config/config.js';
const articleClient = prisma.article;


const LIMIT = 100;
const ORDER ="asc";
const SORT_BY = "name"

/**
 * Create article
 * @param body 
 * @returns 
 */
export const createArticleService = async (body)=>{
    try {
        let article = await articleClient.create({
            data:body
        });
        return article;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * Get all the articles
 * @returns 
 */
export const getAllArticlesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let articles = await articleClient.findMany({
            where:{isActive:true},
            // skip: parseInt(skip),
            // take: parseInt(LIMIT),
            orderBy:{
                name:'asc'
            }
        });
        const total = await articleClient.count({
            where:{isActive:true}
        });
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / LIMIT),
            // total,
            data: articles,
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
export const getArticleByIdService = async(id) =>{
    try {
        let article = await articleClient.findFirst({
            where:{id, isActive: true},
        });
        if (!article) throw new Error(`No article found.`)
        return article;
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
export const getArticlesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let articles = await articleClient.findMany({
            where:queries,
            // skip: parseInt(skip),
            // take: parseInt(limit),
            orderBy:{
                name:'asc'
            }
        });
        const total = await articleClient.count({
            where:{isActive:true}
        });;
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / limit),
            // total,
            data: articles,
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
export const updateArticleService = async (id, body) =>{
    try {
        let article = await articleClient.update({
            where:{id},
            data:body
        });
        return article;
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
export const deleteArticleServices = async (id) =>{
    try {
        let article = await articleClient.update({
            where: {id},
            data:{isActive:false}
        });
        return article
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}