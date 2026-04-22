import type { NextFunction, Request, Response } from "express";
import { config } from "../config/index.js";

export const errorHandler=async(err:any, req:Request, res:Response, next:NextFunction)=>{
console.log(`[Error]: `)
let statusCode = 500;
let message = "Server error";

if(err.message.includes("not found") || err.message.includes("invalid ID") || err.message.includes("not available")){
statusCode = 404;
message = err.message;
}else if(err.message.includes("required") || err.message.includes("must be")){
statusCode = 400;
message = err.message;
}else if(err.message.includes("invalid credentials")){
statusCode = 401;
message = err.message;
}

res.status(statusCode).json({
status:false,
message:message,
...(config.ENV === "production" && {stack:err.stack})
})
}