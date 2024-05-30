import express from 'express';
import dotenv from 'dotenv';

import { mongoConnect } from './DB/mongo.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
