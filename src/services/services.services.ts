import { query } from "../db/conn.js";
import type { ServiceRecords } from "../types/services.types.js";

export class Services{
addNewService=async(service:string, cost:number):Promise<ServiceRecords>=>{
try {
 if(!service || typeof service !== "string"){
    throw new Error("service is required and has to be a string");
 }
 
  if(!cost || typeof cost !== "number" || cost < 0 ){
    throw new Error("cost is required and has to be a number greater than 0");
 }

 const newServiceRecord:ServiceRecords={
    service,
    cost,
    date:new Date().toISOString().split("T")[0] ?? ""
 }

 const insertService = await query<ServiceRecords>(`INSERT INTO service_records(service_name, service_cost, record_date)
    VALUES ($1, $2, $3)
    RETURNING *`,
[newServiceRecord.service, newServiceRecord.cost, newServiceRecord.date]);

const recordInserted = insertService[0];

if(!recordInserted){
throw new Error("No record inserted");
}

return recordInserted;
} catch (error) {
  throw new Error("Error inserting records");  
}
} 

updateService=async(id:number, updates:Partial<ServiceRecords>):Promise<ServiceRecords>=>{
try {
    if(!id || isNaN(id)){
        throw new Error("Invalid ID")
    }

    const fields:string[]=[];
    const values:any[]=[];
    let paramIndex = 1;

    if(updates.service !== undefined){
      fields.push(`service_name = $${paramIndex}`);
      values.push(updates.service);
      paramIndex++;
    }

    if(updates.cost !== undefined){
      fields.push(`service_cost = $${paramIndex}`);
      values.push(updates.cost);
      paramIndex++;
    }

    if(updates.date !== undefined){
      fields.push(`record_date = $${paramIndex}`);
      values.push(updates.date);
      paramIndex++;
    }

    values.push(id);

    if(fields.length === 0){
        throw new Error("No fields available to update")
    }

    const updatedRecord = await query<ServiceRecords>(`UPDATE service_records
        SET ${fields.join(",")}
        WHERE id = $${paramIndex}
        RETURNING *
        `, values
    );

    const recordUpdated = updatedRecord[0];

    if(!recordUpdated){
     throw new Error("No record to update");
    }

    return recordUpdated;
} catch (error) {
   throw error;
}
}

getServices=async():Promise<ServiceRecords[]>=>{
    try {
    const allServices = await query<ServiceRecords>(`SELECT * FROM service_records`);

    if(!allServices){
    throw new Error("No services currently")
    }

    return allServices;
    } catch (error) {
    throw error    
}
}


getServiceId=async(id:number):Promise<ServiceRecords>=>{
    try {
    if(!id || isNaN(id)){
        throw new Error("Invalid ID")
    }

    const allServices = await query<ServiceRecords>(`SELECT * FROM service_records WHERE id=$1`, [id]);

    const fetchedRecord = allServices[0];

    if(!fetchedRecord){
    throw new Error(`service with this id ${id} is not available`)
    }

    return fetchedRecord;
    } catch (error) {
    throw error;
    }
}

deleteService=async(id:number):Promise<{id:number, message:string}>=>{
try {
if(!id || isNaN(id)){
    throw new Error("Invalid ID")
}

const serviceDelete = await query<{id:number}>(`DELETE FROM service_records WHERE id=$1 RETURNING id`,[id]);

const recordDelete = serviceDelete[0]!.id

return {id:recordDelete, message:`service with id:[${id}] is deleted successfully`}
} catch (error) {
  throw error;
}
}
}