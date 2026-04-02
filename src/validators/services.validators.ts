export const validateServiceInput=(data:any):void=>{
if(!data.serviceName || typeof data.serviceName !== "string" || data.serviceName.trim() === ""){
throw new Error("Service name is required and must be a string")
}

if (!data.serviceCost || typeof data.serviceCost !== "number" || data.serviceCost <= 0 || isNaN(data.serviceCost)) {
throw new Error("Service cost is required and must be a positive number")
}
}

export const validateServiceId=(id:number)=>{
if(!id || isNaN(id) || id <= 0){
    throw new Error("Invalid service record ID");
}
}

export const validateUpdates=(data:any)=>{
if(!data || Object.keys(data).length === 0){
    throw new Error("No valid fields to update");
}
}