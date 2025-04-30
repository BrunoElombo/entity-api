import {prisma} from '../config/config.js';
const gradeClient = prisma.grade;


const LIMIT = 100;
const ORDER ="desc";
const SORT_BY = "createdAt"

/**
 * Create a grade
 * @param body 
 * @returns 
 */
export const createGradeService = async (body)=>{
    try {
        let grade = await gradeClient.create({
            data:body
        });
        return grade;
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}


/**
 * 
 * @returns 
 */
export const getAllGradesService = async(body) =>{
    const page = 1;
    const skip = (page - 1) * LIMIT;

    try {
        let grades = await gradeClient.findMany({
            where:{isActive:true},
            skip: parseInt(skip),
            take: parseInt(LIMIT),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await gradeClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / LIMIT),
            total,
            data: grades,
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
export const getGradeByIdService = async(id) =>{
    try {
        let grade = await gradeClient.findFirst({
            where:{id, isActive: true},
        });
        if (!grade) throw new Error(`No grade found.`)
        return grade;
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
export const getGradeByParams = async (request) =>{
    const { page = 1, limit = LIMIT, sortBy = SORT_BY, order=ORDER, ...queries } = request; 
    const skip = (page - 1) * limit;
    try {
        let grade = await gradeClient.findMany({
            where:queries,
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy:{
                createdAt:'desc'
            }
        });
        const total = await gradeClient.count({
            where:{isActive:true}
        });;
        return {
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            total,
            data: grade,
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
export const updateGradeService = async (id, body) =>{
    try {
        let grade = await gradeClient.update({
            where:{id},
            data:body
        });
        return grade;
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
export const deleteGradeService = async (id) =>{
    try {
        let grade = await consommableClient.update({
            where: {id},
            data:{isActive:false}
        });
        // let town = await townClient.delete({
        //     where: {id}
        // });
        return grade
    } catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}