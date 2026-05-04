import express from "express";
import { config } from "./config/index.js";
import { DBConnTest } from "./db/conn.js";
import serviceRouter from "./routers/services.routes.js";
import  userRouter from "./routers/users.routes.js";
import { errorHandler } from "./middlewares/errors.middleware.js";


const app = express();

app.use(express.json());

//middlewares
//app.use(errorHandler);

// Routes
app.use("/", serviceRouter);
app.use("/",userRouter);


const PORT = config.PORT;

const inititalizeApp=()=>{
app.listen(PORT, ()=>{
DBConnTest();
console.log(`Server running on port : ${PORT}`)
})
}

inititalizeApp();