import { Router } from "express";
import type{Response, Request} from "express";
import { MaintananceService } from "../services/maintananceService.js";

const router = Router();

const serviceEngine = new MaintananceService();

router.post("/add-service",async(req:Request, res:Response)=>{
    try {
        const {service,cost}:{service:string,cost:number}=req.body;

        const serviceRecord = await serviceEngine.addService(service,cost);

        res.status(201).json({
            message:"service added successfully!",
            service:serviceRecord
        })
    } catch (error) {
        res.status(400).json({error:"Error adding service"})
    }

})

export default router;