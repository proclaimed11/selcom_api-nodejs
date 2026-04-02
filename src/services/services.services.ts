import { query } from "../db/conn.js";
import type { Service } from "../types/services.types.js";

export class MaintananceServices{
serviceRecordAdded=async(serviceName:string, serviceCost:number):Promise<Service>=>{
try {
    if(!serviceName || typeof serviceName !== "string"){
    throw new Error("Service name is required and must be a string")    
    }

    if(!serviceCost || typeof serviceCost !== "number"){
    throw new Error("Service cost is required and must be a number")    
    }

    const newService:Service={
    serviceName,
    servicePrice:serviceCost,
    date:new Date().toISOString().split("T")[0] ?? ""
    }

    const insertService = await query<Service>(`INSERT INTO service_records (service_name, service_cost, record_date)
        VALUES ($1,$2,$3)
        RETURNING *
        `,[newService.serviceName, newService.servicePrice, newService.date]
    );

    const record = insertService[0];

    if(!record){
    throw new Error("Failed to add service record")    
    }

    return record;
} catch (error) {
    console.error("Error adding service record", error);
    throw error;
}
}

serviceRecordList=async():Promise<Service[]>=>{
try {
    const services = await query<Service>(`SELECT * FROM service_records ORDER BY record_date DESC`);

    if(services.length === 0){
        console.log("No service records found");
    }

    return services;
} catch (error) {
    console.error("Error fetching service records :", error);
    throw error;
}
}

serviceRecordById=async(id:number):Promise<Service>=>{
try {
    if(!id || isNaN(id) || id <= 0){
        throw new Error("Invalid service record ID");
    }

    const serviceById = await query<Service>(`SELECT * FROM service_records WHERE id = $1`, [id]);

    if(serviceById.length === 0){
        throw new Error("Service record not found");
    }

    const serviceFetchedId = serviceById[0]

    if(!serviceFetchedId){
        throw new Error("Failed to fetch service record");
    }

    return serviceFetchedId;
} catch (error) {
    console.error("Error fetching service record by ID :", error);
    throw error;
}
}

serviceRecordUpdate=async(id:number, updates:Partial<Service>)=>{
try {
    if(!id || isNaN(id) || id <= 0){
        throw new Error("Invalid service record ID");
    }

    const fields:string[]=[];
    const values:any[]=[];
    let paramIndex = 1;

    if(updates.serviceName !== undefined){
        fields.push(`service_name = $${paramIndex}`);
        values.push(updates.serviceName);
        paramIndex++;
    }
    if(updates.servicePrice !== undefined){
        fields.push(`service_cost = $${paramIndex}`);
        values.push(updates.servicePrice);
        paramIndex++;
    }
    if(updates.date !== undefined){
        fields.push(`record_date = $${paramIndex}`);
        values.push(updates.date);
        paramIndex++;
    }

    if(fields.length === 0){
        throw new Error("No valid fields to update");
    }

    values.push(id);

    const serviceUpdate = await query<Service>(
       `UPDATE service_records 
        SET ${fields.join(",")}
        WHERE id = $${paramIndex}
        RETURNING *
        `,values
    ) 

    const updatedRecord = serviceUpdate[0];

    if(!updatedRecord){
        throw new Error("Failed to update service record");
    }

    return updatedRecord;
} catch (error) {
    console.error("Error updating service record :", error);
    throw error;
}
}

serviceRecordDelete=async(id:number):Promise<{id:number, message:string}>=>{
    try {
        if(!id || isNaN(id) || id <= 0){
            throw new Error("Invalid service record ID");
        }

        const deleteService = await query<{id:number}>(`DELETE FROM service_records WHERE id = $1 RETURNING id`, [id]);

        const deletedId = deleteService[0]?.id;

        if(!deletedId){
            throw new Error("Service record not found or already deleted");
        }

        return { id: deletedId, message: "Service record deleted successfully" };

    } catch (error) {
        console.error("Error deleting service record :", error);
        throw error;
    }
}
}