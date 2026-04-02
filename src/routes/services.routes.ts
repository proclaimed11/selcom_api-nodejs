import { Router } from "express";
import { createService, deleteService, getAllServices, getServiceById, updateService } from "../controllers/services.contollers.js";

const router = Router();

router.get("/services", getAllServices);

router.post("/new-service", createService);

router.get("/service/:id", getServiceById);

router.put("/service/:id", updateService);

router.delete("/service/:id", deleteService);

export default router;