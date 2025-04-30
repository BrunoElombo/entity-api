import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DB_URL = process.env.DATABASE_URL;
export const USERS_API = process.env.USERS_API;
export const ENTITY_API = process.env.ENTITY_API;
export const prisma = new PrismaClient();