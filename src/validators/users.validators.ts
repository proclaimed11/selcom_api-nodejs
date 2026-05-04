export const validateUserInputs=(data:any)=>{
if(!data.firstName || !data.midName || !data.lastName || !data.email || !data.phoneNumber || !data.password){
throw new Error ("All fields are required!");
}
}
