import type { Response, Request } from "express";
import { Service } from "../services/services.services.js";
import { validateInputs , validateId, validateUpdates} from "../validators/services.validators.js";

const engine = new Service();

export const createService=async(req:Request, res:Response)=>{
const {service, cost}:{service:string, cost:number} = req.body;

validateInputs({service,cost});

const newService = await engine.addService(service, cost);

res.status(201).json({
message:"Service created successfuly!",
data:newService
})
}


export const getAllServices=async(req:Request, res:Response)=>{

const getServices = await engine.getAllServices();

res.status(200).json({
message:"Services fetched successfully!",
data:getServices
})
}

export const getService=async(req:Request, res:Response)=>{

const id = Number(req.params.id);

validateId(id);

const getService = await engine.getService(id);

res.status(200).json({
message:"Service fetched successfully!",
data:getService   
})
}

export const updateServices=async(req:Request, res:Response)=>{
const updates = req.body;

const id = Number(req.params.id);

validateId(id);

validateUpdates(updates);

const getUpdate = await engine.updateService(id, updates);

res.status(200).json({
message:`User with id:${id} has been updated successfully!`,
data:getUpdate
})
}

export const deleteService=async(req:Request, res:Response)=>{
const id = Number(req.params.id);

validateId(id);

const serviceDelete = await engine.deleteService(id);

res.status(200).json({
message:serviceDelete.message,
id:serviceDelete.id
})
}