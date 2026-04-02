import type { Request, Response } from "express";
import { MaintananceServices } from "../services/services.services.js";
import { validateServiceId, validateServiceInput, validateUpdates } from "../validators/services.validators.js";

const serviceEngine = new MaintananceServices();

export const createService=async(req:Request, res:Response)=>{
try {
    const {service, cost}:{service:string, cost:number}=req.body;

    validateServiceInput({serviceName:service, serviceCost:cost});

    const newService = await serviceEngine.serviceRecordAdded(service, cost);

    res.status(201).json({
        message:"Service record added successfully",
        data:newService
    });
} catch (err) {
    res.status(400).json({
        message:"Error creating service record",
        error:err
    });
}
}

export const getAllServices=async(req:Request, res:Response)=>{
try {
    const services = await serviceEngine.serviceRecordList();

    res.status(200).json({
        message:"Service records fetched successfully",
        data:services
    })
} catch (err) {
    res.status(400).json({
        message:"Error fetching service records",
        error:err
    });
}
}

export const getServiceById=async(req:Request, res:Response)=>{
try {
    const id = Number(req.params.id);

    validateServiceId(id);

    const serviceId = await serviceEngine.serviceRecordById(id);

    res.status(200).json({
        message:`Service record with ID :${id} fetched successfully`,
        data:serviceId
    })
} catch (err) {
    res.status(400).json({
        message:`Error fetching service record`,
        error:err
    });
}
}

export const updateService=async(req:Request, res:Response)=>{
try {
   const id = Number(req.params.id);
   const updates = req.body;

   validateServiceId(id);
   validateUpdates(updates);

   const updatedRecord = await serviceEngine.serviceRecordUpdate(id,updates)

   res.status(200).json({
       message:`service with ID: ${id} updated succcessfully`,
       data:updatedRecord
   })
} catch (err) {
    res.status(400).json({
        message:"Error updating record",
        error:err
    })
}
}

export const deleteService=async(req:Request, res:Response)=>{
try {
    const id = Number(req.params.id);

    validateServiceId(id);

    const deletedService = await serviceEngine.serviceRecordDelete(id);

    res.status(200).json({
        message:deletedService.message,
    })
} catch (err) {
    console.error("Error deleating service")
    res.status(400).json({
        message:"Error deleting service",
        error:err
    })
}
}