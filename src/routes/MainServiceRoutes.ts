import { Router } from "express";
import type { Response, Request } from "express";
import { MaintananceServices } from "../services/MaintananceServices.js";


const router = Router();

const engine = new MaintananceServices();

router.get("/services", async (req:Request, res:Response)=>{
    try {
      const services = await engine.getAllServiceRecords(); 
      
      res.json({
        message:"Service records retrieved successfully",
        data:services
      });
    } catch (err) {
      res.status(500).json({
        message:"Failed to retrieve service records",
        error:err
      });
    }
})

router.post("/new-services", async (req:Request, res:Response)=>{
    try {
       const { serviceName, serviceCost } = req.body;
       
       if(!serviceName || !serviceCost){
        return res.status(400).json({
            message:"Service name and cost are required"
        });
       }

        const newService = await engine.addServiceRecord(serviceName, serviceCost);

        res.status(201).json({
            message:"Service record added successfully",
            data:newService
        })
    } catch (err) {
        res.status(500).json({
            message:"Failed to add service record",
            error:err
        });
    }
})

router.get("/services/:id", async (req:Request, res:Response)=>{
    try {
        const id = Number(req.params.id);

        if(isNaN(id) || id <= 0){
            return res.status(400).json({
                message:"Invalid service record ID"
            });
        }

        const retrievedRecord = await engine.getServiceRecordById(id);

        res.json({
            message:`Service record with id ${id} retrieved successfully`,
            data:retrievedRecord
        });
    } catch (error) {
        res.status(500).json({
            message:"Failed to retrieve service record",
            error:error
        });
    }
})

router.put("/services/:id", async (req:Request, res:Response)=>{
    try {
        const id = Number(req.params.id);

        if(isNaN(id) || id <= 0){
            return res.status(400).json({
                message:"Invalid service record ID"
            });
        }

        const updates = req.body;

        const updatedRecord = await engine.updateServiceRecord(id, updates);

        res.json({
            message:`Service record with id ${id} updated successfully`,
            data:updatedRecord
        });
    } catch (error) {
        res.status(500).json({
            message:"Failed to update service record",
            error:error
        });
    }
})


router.delete("/services/:id", async (req:Request, res:Response)=>{
    try {
      const id = Number(req.params.id);
      
        if(isNaN(id) || id <= 0){
            return res.status(400).json({
                message:"Invalid service record ID"
            });
        }

        const deleteResult = await engine.deleteRecord(id);
        res.json({
            message: deleteResult.message,
            data: { id: deleteResult.id }
        });
    } catch (err) {
        res.status(500).json({
            message:"Failed to delete service record",
            error:err
        });
    }
})


export default router;