import { Router } from "express";
import { createService, deleteService, getAllServices, getService, updateServices } from "../controllers/services.controllers.js";

const router = Router();

router.post("/new-service", createService);

router.get("/services", getAllServices);

router.get("/services/:id", getService)

router.put("/services/:id", updateServices);

router.delete("/services/:id", deleteService);

export default router;