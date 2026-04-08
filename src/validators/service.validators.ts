export const validateCreateService=(data:any)=>{
if(!data.serviceName || typeof data.serviceName !== "string"){
throw new Error("Service name is required and has to be a string");
}

if(!data.serviceCost || typeof data.serviceCost !== "number" || isNaN(data.serviceCost) || data.serviceCost < 0){
throw new Error("Service cost is required and has to be a number greater than 0");
}
}

export const validateId=(id:number):number=>{
if(!id || isNaN(id) || id < 0){
throw new Error(`Service id: ${id} is invalid`)
}
return id;
}

export const validateUpdate=(data:any)=>{
if(!data || Object.keys(data).length === 0){
throw new Error("No updates available")
}

if(data.serviceName !== undefined && (!data.serviceName || typeof data.serviceName !== "string")){
    throw new Error("Service name is required and has to be a string");
}

if(data.serviceCost !== undefined && (!data.serviceCost || typeof data.serviceCost !== "number" || isNaN(data.serviceCost) || data.serviceCost < 0)){
   throw new Error("Service cost is required and has to be a number greater than 0");
}
}