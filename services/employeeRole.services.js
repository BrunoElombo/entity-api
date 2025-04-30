import {prisma} from '../config/config.js';
const employeeRoleClient = prisma.employeerole;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create employee role
 * @param body 
 * @returns 
 */
export const createEmployeeRoleService = async (body)=>{
    try {
        let employeeRole = await employeeRoleClient.create({
            data:body
        });
        return employeeRole;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEmployeeRolesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let employeeRoles = await employeeRoleClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                employee: true,
                role:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeeRoleClient.count({
            where:{isActive:true},
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: employeeRoles,
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
export const getEmployeeRoleByIdService = async(id) =>{
    try {
        let employeeRole = await employeeRoleClient.findFirst({
            where:{id, isActive: true},
            include:{
                employee: true,
                role:true
            },
        });
        if (!employeeRole) throw new Error(`No employee role found.`)
        return employeeRole;
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
export const getEmployeeRolesByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let employeeRoles = await employeeRoleClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            include:{
                employee: true,
                role:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await employeeRoleClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: employeeRoles,
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
export const updateEmployeeRoleService = async (id, body) =>{
    try {
        let employeeRole = await employeeRoleClient.update({
            where:{id},
            data:body
        });
        return employeeRole;
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
export const deleteEmployeeRoleServices = async (id) =>{
    try {
        let employeeRole = await employeeRoleClient.update({
            where: {id},
            data:{isActive:false}
        });
        return employeeRole
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}