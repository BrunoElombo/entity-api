import {prisma} from '../config/config.js';
const roleClient = prisma.role;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create role
 * @param body 
 * @returns 
 */
export const createRoleService = async (body)=>{
    try {
        let role = await roleClient.create({
            data:body
        });
        return role;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllRolesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let roles = await roleClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await roleClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: roles,
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
export const getRoleByIdService = async(id) =>{
    try {
        let role = await roleClient.findFirst({
            where:{id, isActive: true},
        });
        if (!role) throw new Error(`No role found.`)
        return role;
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
export const getRolesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let roles = await roleClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await roleClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: roles,
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
export const updateRoleService = async (id, body) =>{
    try {
        let role = await roleClient.update({
            where:{id},
            data:body
        });
        return role;
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
export const deleteRoleServices = async (id) =>{
    try {
        let role = await roleClient.update({
            where: {id},
            data:{isActive:false}
        });
        return role
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}