import type { Response, Request, NextFunction } from "express";
import { config } from "../config/index.js";

export const errorHandler=(err:any, req:Request, res:Response, next:NextFunction)=>{
console.log(`[Error] : ${err.message}`);

let statusCode = 500;
let message = "Server Error"

if(err.message.includes("not found") || err.message.includes("invalid ID") || err.message.includes("not available") || err.message.includes("undefined")){
    statusCode = 404;
    message = err.message
}else if(err.message.includes("required") || err.message.includes("must be")){
    statusCode = 400;
    message = err.message
}else if(err.message.includes("invalid credentials")){
    statusCode = 401;
    message = err.message;
}

res.status(statusCode).json({
status:false,
message:message,
...(config.env === "development" && {stack:err.stack}) 
})
}