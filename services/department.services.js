import {prisma} from '../config/config.js';
const departmentClient = prisma.department;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a department
 * @param body 
 * @returns 
 */
export const createDepartmentService = async (body)=>{
    try {
        let department = await departmentClient.create({
            data:body
        });
        return department;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllDepartmentsService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let departments = await departmentClient.findMany({
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
        const total = await departmentClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: departments,
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
export const getDepartmentByIdService = async(id) =>{
    try {
        let departments = await departmentClient.findFirst({
            where:{id, isActive: true},
        });
        if (!departments) throw new Error(`No department found.`)
        return departments;
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
export const getDepartmentsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let departments = await departmentClient.findMany({
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
            data: departments,
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
export const updateDepartmentService = async (id, body) =>{
    try {
        let department = await departmentClient.update({
            where:{id},
            data:body
        });
        return department;
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
export const deleteDepartmentServices = async (id) =>{
    try {
        let department = await departmentClient.update({
            where: {id},
            data:{isActive:false}
        });
        return department
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}