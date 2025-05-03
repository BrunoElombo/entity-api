import { USERS_API, ENTITY_API, prisma } from "../config/config.js";
import HTTP_STATUS from '../utils/http.utils.js';
import { jwtDecode } from "jwt-decode";

export const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(HTTP_STATUS.UN_AUTHORIZED.statusCode).json({ error:true, error_list: [{msg:"token is not provided", field:"token"}] });
  }

  try {
    const raw = JSON.stringify({token:token});
      const requestOptions = {
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: raw,
      };
    let result = fetch(`${USERS_API}token/verify/`, requestOptions);

    if((await result).status != 200){
      throw new Error("Invalid user token");
    }


    let decodedToken = jwtDecode(token);
    if(!decodedToken) return res.status(HTTP_STATUS.UN_AUTHORIZED.statusCode).json({ error:true, error_list: [{msg:"Token expired or not valid", "path":"token"}] });
    // let employee = await getEmployee(decodedToken?.user_id);
    // console.log(employee)
    // if(!employee) return res.status(HTTP_STATUS.UN_AUTHORIZED.statusCode).json({ error:true, error_list: [{msg:"Token expired or not valid", "path":"token"}] });

    // req["employeeId"] = employee?.id;
    if(req.method === "POST"){
        req.body["createdBy"] = decodedToken?.user_id;
    }else if(req.method === "PATCH" || req.method === "DELETE"){
        req.body["updatedBy"] = decodedToken?.user_id;
    }

    next();
  } catch (error) {
    console.error(error);
    return res
    .status(HTTP_STATUS.BAD_REQUEST.statusCode)
    .send(HTTP_STATUS.BAD_REQUEST.message);
  }
};




const getEmployee = async (userId) =>{
  if(!userId) return null
  try {
      
      let employee = await prisma.employee.findFirst({
        where:{
          userId, isActive:true
        }
      });

      if(!employee) return null;
      return employee;
  } catch (error) {
      console.log(error);
      res
      .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
      .json({ error:true, error_list: [{msg:HTTP_STATUS.SERVEUR_ERROR.message, "path":"server error"}] });
      return;
  }
}
