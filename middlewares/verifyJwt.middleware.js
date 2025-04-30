import { USERS_API } from "../config/config.js";
import HTTP_STATUS from '../utils/http.utils.js';
import { jwtDecode } from "jwt-decode";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
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
    let employee = await getEmployee(decodedToken?.user_id, token);
    if(!employee?.id) return res.status(HTTP_STATUS.UN_AUTHORIZED.statusCode).json({ error:true, error_list: [{msg:"Token expired or not valid", "path":"token"}] });

    req["employeeId"] = employee?.id;
    // if(req.method === "POST"){
    //     req.body["createdBy"] = employee?.id;
    // }else if(req.method === "PATCH" || req.method === "DELETE"){
    //     req.body["updatedBy"] = employee?.id;
    // }

    // req.body.userId = jwtDecode(token)?.user_id
    next();
  } catch (error) {
    console.error(error);
    return res
    .status(HTTP_STATUS.BAD_REQUEST.statusCode)
    .send(HTTP_STATUS.BAD_REQUEST.message);
  }
};




const getEmployee = async (userId, token) =>{
  if(!userId) return null
  let url = `${ENTITY_API}/employees/?userId=${userId}`
  let requestOptions ={
      method: "GET",
      headers:{
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
      }
  }
  try {
      let response = await fetch(url, requestOptions);
      if(response.status === 200){
          let result = await response.json();
          if(result?.data.length > 0){
              return result?.data[0];
          }
          return result
      }
  } catch (error) {
      console.log(error);
      res
      .status(HTTP_STATUS.SERVEUR_ERROR.statusCode)
      .json({ error:true, error_list: [{msg:HTTP_STATUS.SERVEUR_ERROR.message, "path":"server error"}] });
      return;
  }
}
