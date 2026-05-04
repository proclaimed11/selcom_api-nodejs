import { UserService } from "../services/users.services.js";
import  type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateUserInputs } from "../validators/users.validators.js";

const userEngine = new UserService();

export const registerUser=async(req:Request, res:Response)=>{
const {firstName, midName, lastName, email, phoneNumber, password} : {firstName:string, midName:string, lastName:string, email:string, phoneNumber:string, password:string} = req.body;

validateUserInputs({firstName, midName, lastName, email, phoneNumber, password});

const saltRounds = 10;

const passwordHash = await bcrypt.hash(password, saltRounds);

await userEngine.addUser(firstName, midName, lastName, email, phoneNumber, passwordHash);

res.status(201).json({
message:"User registered successfuly!"
});
}