import {prisma} from '../config/config.js';
const clientBankAccountClient = prisma.clientbankaccount;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a clientBankAccount
 * @param body 
 * @returns 
 */
export const createClientBankAccountService = async (body)=>{
    try {
        let clientBankAccount = await clientBankAccountClient.create({
            data:body
        });
        return clientBankAccount;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllClientBankAccountService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let clientBankAccounts = await clientBankAccountClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            include:{
                bank:true,
                customer:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await clientBankAccountClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: clientBankAccounts,
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
export const getClientBankAccountByIdService = async(id) =>{
    try {
        let clientBankAccount = await clientBankAccountClient.findFirst({
            where:{id, isActive: true},
        });
        if (!functions) throw new Error(`No client bank account found.`)
        return clientBankAccount;
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
export const getClientBankAccountsByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let clientBankAccounts = await clientBankAccountClient.findMany({
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
            data: clientBankAccounts,
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
export const updateClientBankAccountService = async (id, body) =>{
    try {
        let clientBankAccounts = await clientBankAccountClient.update({
            where:{id},
            data:body
        });
        return clientBankAccounts;
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
export const deleteClientBankAccountServices = async (id) =>{
    try {
        let clientBankAccounts = await clientBankAccountClient.update({
            where: {id},
            data:{isActive:false}
        });
        return clientBankAccounts
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}