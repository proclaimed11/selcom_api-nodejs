import type { ServiceRecord } from "../types/index.js";
import { query } from "../db/connection.js";

export class MaintananceService{
    private serviceLog:ServiceRecord[] = [];

addService=async(serviceName:string, cost:number):Promise<ServiceRecord>=>{
try {
    if(!serviceName || typeof serviceName !== "string"){throw new Error("service is required and must be a string")}
    if(!cost || isNaN(cost) || cost < 0){throw new Error("cost is requires and has to be a number greater than zero")}

    const newService:ServiceRecord={
        serviceName,
        cost,
        recordDate: new Date().toISOString().split("T")[0] ?? ""
    }

    const insertedService = await query<ServiceRecord>(`INSERT INTO service_records(service_name, cost, record_date)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [newService.serviceName, newService.cost, newService.recordDate]
    );

    this.serviceLog.push(newService);

    const record = insertedService[0]

    if (!record) throw new Error("Insert failed, no record returned");

    return record;
} catch (error) {
    console.error("Error creating new record", error)
    throw error;
}
}
}