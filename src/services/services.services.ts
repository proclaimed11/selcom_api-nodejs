import { query } from "../db/conn.js";
import type { ServiceRecord } from "../types/services.types.js"

export class Service{
addService=async(service:string, cost:number):Promise<ServiceRecord>=>{
    try {
    if(!service || typeof service !== "string"){
    throw new Error("Service is required and has to be a string");
    }

    if(!cost || typeof cost !== "number" || cost < 0){
    throw new Error("cost is required and has to be a number greater than 0");
    }

    const newService:ServiceRecord={
        service,
        cost,
        date:new Date().toISOString().split("T")[0] ?? ""
    }

    const insertService = await query<ServiceRecord>(`
        INSERT INTO service_records(service_name, service_cost, record_date)
        VALUES ($1, $2, $3)
        RETURNING *
        `,[newService.service, newService.cost, newService.date]
    );

    const record = insertService[0];

    if(!record){
        throw new Error("No record added")
    }

    return record;

    } catch (error) {
    throw error; 
    }
}

getService=async(id:number):Promise<ServiceRecord>=>{
    try {
    if(!id || isNaN(id)){
     throw new Error("invalid id")
    }
    const service = await query<ServiceRecord>(`
        SELECT * FROM service_records
        WHERE id=$1
        `,[id]
    );

     const record = service[0];

    if(!record){
        throw new Error("No service was found")
    }

    return record;

    } catch (error) {
    throw error; 
    }
}

getAllServices=async():Promise<ServiceRecord[]>=>{
    try {
    const services = await query<ServiceRecord>(`
        SELECT * FROM service_records
        `,
    );

    return services;

    } catch (error) {
    throw error; 
    }
}

updateService=async(id:number, updates:ServiceRecord):Promise<Partial<ServiceRecord>>=>{
try {
if(!id || isNaN(id)){
throw new Error("invalid id")
}

const fields:string[]=[];
const values:any[]=[];
let paramIndex = 1;

if(updates.service !== undefined){
    fields.push(`service_name = $${paramIndex}`);
    values.push(updates.service);
    paramIndex ++
}

if(updates.cost !== undefined){
    fields.push(`service_cost = $${paramIndex}`);
    values.push(updates.cost);
    paramIndex ++
}

if(updates.date !== undefined){
    fields.push(`record_date = $${paramIndex}`);
    values.push(updates.date);
    paramIndex ++
}

values.push(id)

if(fields.length==0){
throw new Error("No fields to update")
}

const updateServiceRecord = await query<ServiceRecord>(
  `UPDATE service_records
  SET ${fields.join(", ")}
  WHERE id = $${paramIndex}
  RETURNING *
  `, values  
);


const record = updateServiceRecord[0];

if(!record){
    throw new Error("No service was found")
}

return record;
} catch (error) {
  throw error;  
}
}


deleteService=async(id:number):Promise<{id:number, message:string}>=>{
    try {
    if(!id || isNaN(id)){
     throw new Error("invalid id")
    }

    const servicesDelete = await query<{id:number}>(`
        DELETE FROM service_records
        WHERE id = $1
        RETURNING id`,
    [id]);

    const deleteId = servicesDelete[0]?.id;

    if(!deleteId){
     throw new Error("deleted id is not found")
    }

    return {id:deleteId, message:"service deleted successfuly!"}

    } catch (error) {
    throw error; 
    }
}
}
