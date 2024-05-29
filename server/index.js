import express from 'express';
import dotenv from 'dotenv';

import { mongoConnect } from './DB/mongo.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes);

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
