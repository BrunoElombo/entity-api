import {prisma} from '../config/config.js';
const entityBankAccountClient = prisma.entitybankaccount;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a Entity Bank Account
 * @param body 
 * @returns 
 */
export const createEntityBankAccountService = async (body)=>{
    try {
        let entityBankAccount = await entityBankAccountClient.create({
            data:body
        });
        return entityBankAccount;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllEntityBankAccountService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let entityBankAccount = await entityBankAccountClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                bank:true,
                entity:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityBankAccountClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: entityBankAccount,
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
export const getEntityBankAccountByIdService = async(id) =>{
    try {
        let entityBankAccount = await entityBankAccountClient.findFirst({
            where:{id, isActive: true},
        });
        if (!functions) throw new Error(`No entity bank account found.`)
        return entityBankAccount;
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
export const getEntityBankAccountsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let entityBankAccounts = await entityBankAccountClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await entityBankAccountClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: entityBankAccounts,
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
export const updateEntityBankAccountService = async (id, body) =>{
    try {
        let entityBankAccount = await entityBankAccountClient.update({
            where:{id},
            data:body
        });
        return entityBankAccount;
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
export const deleteEntityBankAccountService = async (id) =>{
    try {
        let entityBankAccount = await entityBankAccountClient.update({
            where: {id},
            data:{isActive:false}
        });
        return entityBankAccount
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}