// prisma/client.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['query'],
      errorFormat: 'pretty'
});

module.exports = prisma;