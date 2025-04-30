import {prisma} from '../config/config.js';
const permissionClient = prisma.permission;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create permission
 * @param body 
 * @returns 
 */
export const createPermissionService = async (body)=>{
    try {
        let permission = await permissionClient.create({
            data:body
        });
        return permission;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllPermissionsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let permissions = await permissionClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await permissionClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: permissions,
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
export const getPermissionByIdService = async(id) =>{
    try {
        let permission = await permissionClient.findFirst({
            where:{id, isActive: true},
        });
        if (!permission) throw new Error(`No permission found.`)
        return permission;
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
export const getPermissionsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let permissions = await permissionClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await permissionClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: permissions,
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
export const updatePermissionService = async (id, body) =>{
    try {
        let permission = await permissionClient.update({
            where:{id},
            data:body
        });
        return permission;
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
export const deletePermissionServices = async (id) =>{
    try {
        let permission = await permissionClient.update({
            where: {id},
            data:{isActive:false}
        });
        return permission
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}