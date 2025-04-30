import {prisma} from '../config/config.js';
const permissionRoleClient = prisma.permissionrole;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create permission role
 * @param body 
 * @returns 
 */
export const createPermissionRoleService = async (body)=>{
    try {
        let permissionRole = await permissionRoleClient.create({
            data:body
        });
        return permissionRole;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllPermissionRolesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let permissionRoles = await permissionRoleClient.findMany({
            where:{isActive:true},
            include:{
                role: true,
                permission:true
            },
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await permissionRoleClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: permissionRoles,
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
export const getPermissionRoleByIdService = async(id) =>{
    try {
        let permissionRole = await permissionRoleClient.findFirst({
            where:{id, isActive: true},
            include:{
                role: true,
                permission:true
            },
        });
        if (!permissionRole) throw new Error(`No permission role found.`)
        return permissionRole;
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
export const getPermissionRolesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let permissionRoles = await permissionRoleClient.findMany({
            where:queries,
            include:{
                role: true,
                permission:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await permissionRoleClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: permissionRoles,
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
export const updatePermissionRoleService = async (id, body) =>{
    try {
        let permissionRole = await permissionRoleClient.update({
            where:{id},
            data:body
        });
        return permissionRole;
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
export const deletePermissionRoleServices = async (id) =>{
    try {
        let permissionRole = await permissionRoleClient.update({
            where: {id},
            data:{isActive:false}
        });
        return permissionRole
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}