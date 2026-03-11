import dotenv from 'dotenv';
dotenv.config();

import { DbConnTest } from './db/pool.js';
import express from "express"
import { config } from './config/index.js';
import { testOp } from './db/test.js';

const app = express();

app.use(express.json());

const PORT = config.port;

const ENV = config.environment

const initialize =async()=>{
  await DbConnTest();
  await testOp();
  app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}--->${ENV} 🚀🚀`)
  });
}

initialize().catch(console.error);