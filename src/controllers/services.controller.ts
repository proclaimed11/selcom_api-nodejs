import { Services } from "../services/services.services.js";
import type { Response, Request } from "express";
import { validateCreateService, validateId, validateUpdate } from "../validators/service.validators.js";

const serviceEngine = new Services();

export const createService=async(req:Request, res:Response)=>{
const {service, cost}:{service:string, cost:number} = req.body;

validateCreateService({serviceName:service, serviceCost:cost});

const newService = await serviceEngine.addNewService(service, cost);

res.status(201).json({
    message:"service created successfully",
    data:newService
})
}

export const updateService=async(req:Request, res:Response)=>{
const id = Number(req.params.id);
const updates= req.body;

validateId(id);
validateUpdate(updates);

const updateService = await serviceEngine.updateService(id,updates);

res.status(201).json({
    message:"service updated successfully",
    data:updateService
})
}

export const getAllServices=async(req:Request, res:Response)=>{
const fetchedServices = await serviceEngine.getServices();

res.status(200).json({
message:"services fetched successfully!",
data:fetchedServices
})
}

export const getServiceById=async(req:Request, res:Response)=>{
const id = Number(req.params.id)

validateId(id);

const fetchedServiceId = await serviceEngine.getServiceId(id);

res.status(200).json({
message:"service fetched successfully!",
data:fetchedServiceId
})
}

export const deleteService=async(req:Request, res:Response)=>{
const id = Number(req.params.id)

validateId(id);

const deletedService = await serviceEngine.deleteService(id);

res.status(200).json({
    message:deletedService.message,
    id:deletedService.id
})
}