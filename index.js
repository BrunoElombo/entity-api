import express from 'express'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { verifyToken } from './middlewares/verifyJwt.middleware.js';
const app = express();

// Modules
import applicationRoutes from './routes/application.routes.js';
import applicationPermissionRoutes from './routes/applicationPermission.routes.js';
import articleRoutes from './routes/article.routes.js';
import articleFamilyRoutes from './routes/articleFamily.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import employeePermissionRoutes from './routes/employeePermission.routes.js';
import employeeRoleRoutes from './routes/employeeRole.routes.js';
import permissionRoutes from './routes/permission.routes.js';
import roleRoutes from './routes/role.routes.js';
import permissionRoleRoutes from './routes/permissionRole.routes.js';
import bankRoutes from './routes/bank.routes.js'
import categoryRoutes from './routes/category.routes.js'
import clientRoutes from './routes/client.routes.js'
import clientBankAccountRoutes from './routes/clientBankAccount.routes.js'
import countryRoutes from './routes/country.routes.js';
import departmentRoutes from './routes/department.routes.js';
import districtRoutes from './routes/district.routes.js';
import echelonRoutes from './routes/echelon.routes.js';
import entityRoutes from './routes/entity.routes.js';
import entityBankAccountRoutes from './routes/entityBankAccount.routes.js';
import functionRoutes from './routes/function.routes.js';
import gradeRoutes from './routes/grade.routes.js';
import serviceRoutes from './routes/service.routes.js';
import shiftRoutes from './routes/shift.controllers.js';
import supplierRoutes from './routes/supplier.routes.js';
import townRoutes from './routes/town.routes.js';
import siteRoutes from './routes/site.routes.js';
import HTTP_STATUS from './utils/http.utils.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { logger } from './middlewares/logEvents.js';

app.use(errorHandler);
app.use(logger);
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("common"));
// app.use(verifyToken);
app.use("/api/banks", bankRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/application-permissions", applicationPermissionRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/article-families", articleFamilyRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/employee-permissions", employeePermissionRoutes);
app.use("/api/employee-roles", employeeRoleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permission-roles", permissionRoleRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/client-bank-accounts", clientBankAccountRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/echelons", echelonRoutes);
app.use("/api/entities", entityRoutes);
app.use("/api/entity-bank-accounts", entityBankAccountRoutes);
app.use("/api/functions", functionRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/sites", siteRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/towns", townRoutes);

app.use((req, res) => {
    return res
        .status(HTTP_STATUS.NOT_FOUND.statusCode)
        .send(`<h1>404 Not Found</h1>`);
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on ${process.env.PORT}`)
});
