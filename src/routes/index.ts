import { Router } from "express";
import type { Request, Response } from "express";
import type { User } from "../types/index.js";
import { readNotes } from "../utils/db.js";

const router = Router();


const users:User[]=[
    {
        id:1,
        name:"Pascal Kibona",
        email:"pascal.kibona@example.com"
    }
];

const fetchVehicleData =async():Promise<string>=>{
await new Promise((resolver)=>setTimeout(resolver,1000));
return "Toyota Camry 2020, License Plate: ABC-1234";
}

router.get("/profile", async(req:Request, res:Response)=>{
    try {   
        const user = users[0];

        if(!user){res.json({ error: "User not found!" }); return;}

        const myNotes = await readNotes();

        const vehicleData = await fetchVehicleData();

        res.json({
            message:"User profile data fetched successfully!",
            user,
            vehicleData,
            myNotes:myNotes || "No notes found!"
        }) 
    } catch (error) {
        res.status(500).json({ error: "Error fetching profile data: " + error });
    }
});

export default router;



