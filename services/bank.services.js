import {prisma} from '../config/config.js';
const bankClient = prisma.bank;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a bsnk
 * @param body 
 * @returns 
 */
export const createBankService = async (body)=>{
    try {
        let bank = await bankClient.create({
            data:body
        });
        return bank;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllBanksService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let bank = await bankClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await bankClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: bank,
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
export const getBankByIdService = async(id) =>{
    try {
        let bank = await bankClient.findFirst({
            where:{id, isActive: true},
        });
        if (!bank) throw new Error(`No bank found.`)
        return bank;
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
export const getBanksByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let banks = await bankClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await bankClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: banks,
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
export const updateBankService = async (id, body) =>{
    try {
        let bank = await bankClient.update({
            where:{id},
            data:body
        });
        return bank;
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
export const deleteBankServices = async (id) =>{
    try {
        let bank = await bankClient.update({
            where: {id},
            data:{isActive:false}
        });
        return bank
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}