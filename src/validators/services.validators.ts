export const validateInputs=async(data:any)=>{
if(!data){
throw new Error("No body found on request")
}

if(typeof data.service !== "string" || !data.service || data.service === "undefined"){
throw new Error("service is required and should be a string")
}

if(typeof data.cost !== "number" || !data.cost || data.cost === "undefined" || data.cost < 0){
throw new Error("cost is required and should be a number greater than 0")
}
}


export const validateId=async(id:number)=>{
if(!id || isNaN(id) || typeof id !== "number"){
throw new Error("invalid id")
}
}

export const validateUpdates=(updates:any)=>{
if(!updates || Object.keys(updates).length == 0){
throw new Error("No updates values available");
}
}