import {prisma} from '../config/config.js';
const supplierClient = prisma.supplier;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a supplier
 * @param body 
 * @returns 
 */
export const createSupplierService = async (body)=>{
    try {
        let supplier = await supplierClient.create({
            data:body
        });
        return supplier;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllSuppliersService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let suppliers = await supplierClient.findMany({
            where:{isActive:true},
            // skip: parseInt(skip),
            // take: parseInt(LIMIT),
            include:{
                entity:true
            },
            orderBy:{
                name:'asc'
            }
        });
        const total = await supplierClient.count({
            where:{isActive:true}
        });;
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / LIMIT),
            // total,
            data: suppliers,
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
export const getSupplierByIdService = async(id) =>{
    try {
        let supplier = await supplierClient.findFirst({
            where:{id, isActive: true},
        });
        if (!supplier) throw new Error(`No supplier found.`)
        return supplier;
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
export const getSuppliersByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, search, ...queries } = request;
    const skip = (page - 1) * limit;
    try {
        let suppliers = await supplierClient.findMany({
            where:!search ? {...queries, isActive:true} : {
                name:{
                    contains:search
                },
                isActive:true
            },
            include:{
                entity:true
            },
            // skip: parseInt(skip),
            // take: parseInt(limit),
            orderBy:{
                name:'asc'
            }
        });
        const total = await supplierClient.count({
            where:{isActive:true}
        });
        return {
            // page: parseInt(page),
            // totalPages: Math.ceil(total / limit),
            // total,
            data: suppliers,
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
export const updateSupplierService = async (id, body) =>{
    try {
        let supplier = await supplierClient.update({
            where:{id},
            data:body
        });
        return supplier;
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
export const deleteSupplierService = async (id) =>{
    try {
        let supplier = await supplierClient.update({
            where: {id},
            data:{isActive:false}
        });
        return supplier
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}