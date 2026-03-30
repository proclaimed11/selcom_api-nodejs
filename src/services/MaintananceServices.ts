import type { ServiceRecord } from "../types/index.js";
import { query } from "../db/conn.js";

export  class MaintananceServices {
addServiceRecord = async (serviceName: string, serviceCost: number):Promise<ServiceRecord> => {
    try {
       if(!serviceName || typeof serviceName !== "string"){ throw new Error("Service name is required and has to be a string"); } 
       if(!serviceCost || isNaN(serviceCost)|| serviceCost <= 0){ throw new Error("Cost is required and has to be a number greater than 0"); }
       
       const newServiceRecord:ServiceRecord = {
        serviceName,
        serviceCost,
        serviceDate:new Date().toISOString().split("T")[0] ?? "",
       }

       const insertedRecord = await query<ServiceRecord>(`
        INSERT INTO service_records (service_name, service_cost, record_date)
        VALUES ($1, $2, $3)
         RETURNING *`,
        [newServiceRecord.serviceName, newServiceRecord.serviceCost, newServiceRecord.serviceDate]);

        const record = insertedRecord[0];

        if(!record){
            throw new Error("Failed to insert service record");
        }

        return record;
    } catch (error) {
        throw new Error("Failed to add service record");
    }
}

getAllServiceRecords = async ():Promise<ServiceRecord[]> => {
    try {
        const records = await query<ServiceRecord>(`SELECT * FROM service_records ORDER BY record_date DESC`);
        return records;
    } catch (error) {
        throw new Error("Failed to retrieve service records");
    }
}

getServiceRecordById=async(id:number):Promise<ServiceRecord>=>{
try {
    if(!id || isNaN(id) || id <= 0){
         throw new Error("Invalid service record ID");
    }

    const recordWithId = await query<ServiceRecord>(`SELECT * FROM service_records WHERE id = $1`, [id]);

    const record = recordWithId[0];

    if(!record){
        throw new Error(`Service record with ID ${id} not found`);
    }

    return record;
} catch (error) {
    throw new Error("Failed to retrieve service record");
}
}

updateServiceRecord = async(id:number, updates:Partial<ServiceRecord>):Promise<ServiceRecord>=>{
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

    if(updates.serviceCost !== undefined){
        fields.push(`service_cost = $${paramIndex}`);
        values.push(updates.serviceCost);
        paramIndex++;
    }

    if(updates.serviceDate !== undefined){
        fields.push(`record_date = $${paramIndex}`);
        values.push(updates.serviceDate);
        paramIndex++;
    }   

    if(fields.length === 0){
        throw new Error("No valid fields to update");
    }

    values.push(id);

    const updatedRecord = await query<ServiceRecord>(`
        UPDATE service_records
        SET ${fields.join(", ")}
        WHERE id = $${paramIndex}
        RETURNING *`, 
        values);

    const record = updatedRecord[0];

    if(!record){
        throw new Error(`Service record with ID ${id} not found`);
    }

    return record;
} catch (error) {
    throw new Error("Failed to update service record");
}
}

deleteRecord = async(id:number):Promise<{id:number, message:string}>=>{
    try {
        if(isNaN(id) || id <= 0){
            throw new Error("Invalid service record ID");
        }

        const deleteResult = await query<{id:number}>(`DELETE FROM service_records WHERE id = $1 RETURNING id `, [id]);

        const deletedId = deleteResult[0]?.id;

        if(!deletedId){
            throw new Error(`Service record with ID ${id} not found`);
        }

        return { id: deletedId, message: `Service record with ID ${id} deleted successfully` };
    } catch (err) {
        throw new Error("Failed to delete service record");
    }
}
}