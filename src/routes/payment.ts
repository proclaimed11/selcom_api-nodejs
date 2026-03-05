import { Router } from "express";
import type { Request, Response } from "express";
import { MaintenanceService } from "../services/maintananceService.js";

const router = Router();

const maintenanceService = new MaintenanceService();

router.post("/add-service", async(req:Request, res:Response)=>{
    try {
        const{service, cost}:{service:string, cost:number} = req.body;

        const newService = await maintenanceService.addService(service, cost);

        const serviceLength = maintenanceService.getServicesNumber();

        res.json({
            message:"Service added successfully!",
            service:newService,
            totalServices:serviceLength
        })

    } catch (error) {
        res.status(400).json({
            error:"Error adding service: "+error
        })
    }
})

export default router;