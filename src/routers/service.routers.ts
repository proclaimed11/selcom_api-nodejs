import { Router } from "express";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../controllers/services.controller.js";


const router = Router();

router.post("/new-service", createService);

router.put("/services/:id", updateService);

router.get("/services", getAllServices);

router.get("/services/:id", getServiceById);

router.delete("/services/:id", deleteService)

export default router;