import {prisma} from '../config/config.js';
const countryClient = prisma.country;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a country
 * @param body 
 * @returns 
 */
export const createCountryService = async (body)=>{
    try {
        let country = await countryClient.create({
            data:body
        });
        return country;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllCountriesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let countries = await countryClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await countryClient.count({
            where:{isActive:true}
        });
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: countries,
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
export const getCountryByIdService = async(id) =>{
    try {
        let country = await countryClient.findFirst({
            where:{id, isActive: true},
        });
        if (!country) throw new Error(`No country found.`)
        return country;
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
export const getCountryByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let country = await countryClient.findMany({
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
            data: country,
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
export const updateCountryService = async (id, body) =>{
    try {
        let country = await countryClient.update({
            where:{id},
            data:body
        });
        return country;
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
export const deleteCountryServices = async (id) =>{
    try {
        // let country = await consommableClient.update({
        //     where: {id},
        //     data:{isActive:false}
        // });
        let country = await countryClient.delete({
            where: {id}
        });
        return country
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}