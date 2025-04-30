import {prisma} from '../config/config.js';
const categoryClient = prisma.category;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a category
 * @param body 
 * @returns 
 */
export const createCategoryService = async (body)=>{
    try {
        let category = await categoryClient.create({
            data:body
        });
        return category;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllCategoriesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let categories = await categoryClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await categoryClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: categories,
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
export const getCategoryByIdService = async(id) =>{
    try {
        let category = await categoryClient.findFirst({
            where:{id, isActive: true},
        });
        if (!category) throw new Error(`No category found.`)
        return category;
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
export const getCategoriesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let category = await categoryClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await categoryClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: category,
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
export const updateCategoryService = async (id, body) =>{
    try {
        let category = await categoryClient.update({
            where:{id},
            data:body
        });
        return category;
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
export const deleteCategoryServices = async (id) =>{
    try {
        let category = await categoryClient.update({
            where: {id},
            data:{isActive:false}
        });
        // let town = await townClient.delete({
        //     where: {id}
        // });
        return category
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}