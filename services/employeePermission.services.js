import {prisma} from '../config/config.js';
const employeePermissionClient = prisma.employeepermission;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create employee permission
 * @param body 
 * @returns 
 */
export const createEmployeePermissionService = async (body)=>{
    try {
        let employeePermission = await employeePermissionClient.create({
            data:body
        });
        return employeePermission;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEmployeePermissionsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let employeePermissions = await employeePermissionClient.findMany({
            where:{isActive:true},
            include:{
                employee: true,
                permission:true
            },
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeePermissionClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: employeePermissions,
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
export const getEmployeePermissionByIdService = async(id) =>{
    try {
        let employeePermission = await employeePermissionClient.findFirst({
            where:{id, isActive: true},
            include:{
                employee: true,
                permission:true
            },
        });
        if (!employeePermission) throw new Error(`No employee permission found.`)
        return employeePermission;
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
export const getEmployeePermissionsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let employeePermissions = await employeePermissionClient.findMany({
            where:{isActive: true, ...queries},
            include:{
                employee: true,
                permission:true
            },
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeePermissionClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: employeePermissions,
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
export const updateEmployeePermissionService = async (id, body) =>{
    try {
        let employeePermission = await employeePermissionClient.update({
            where:{id},
            data:body
        });
        return employeePermission;
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
export const deleteEmployeePermissionServices = async (id) =>{

    try {
        let employeePermission = await employeePermissionClient.update({
            where: {id},
            data:{isActive:false}
        });
        return employeePermission
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}