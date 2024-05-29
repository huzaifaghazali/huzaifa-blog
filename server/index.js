import express from 'express';
import dotenv from 'dotenv';

import { mongoConnect } from './DB/mongo.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
