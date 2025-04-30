import {prisma} from '../config/config.js';
const applicationPermissionClient = prisma.applicationpermission;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create application permission
 * @param body 
 * @returns 
 */
export const createApplicationPermissionService = async (body)=>{
    try {
        let applicationPermission = await applicationPermissionClient.create({
            data:body
        });
        return applicationPermission;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllApplicationPermissionsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let applicationPermissions = await applicationPermissionClient.findMany({
            where:{isActive:true},
            include:{
                applicationId: true,
                permissionId: true
            },
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationPermissionClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: applicationPermissions,
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
export const getApplicationPermissionByIdService = async(id) =>{
    try {
        let applicationPermission = await applicationPermissionClient.findFirst({
            where:{id, isActive: true},
            include:{
                application: true,
                permission: true
            },
        });
        if (!applicationPermission) throw new Error(`No application permission found.`)
        return applicationPermission;
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
export const getApplicationPermissionsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let applicationPermissions = await applicationPermissionClient.findMany({
            where:queries,
            include:{
                application: true,
                permission: true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await applicationPermissionClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: applicationPermissions,
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
export const updateApplicationPermissionService = async (id, body) =>{
    try {
        let applicationPermission = await applicationPermissionClient.update({
            where:{id},
            data:body
        });
        return applicationPermission;
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
export const deleteApplicationPermissionServices = async (id) =>{
    try {
        let applicationPermission = await applicationPermissionClient.update({
            where: {id},
            data:{isActive:false}
        });
        return applicationPermission
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}