import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getDb } from './db.js';
import { authRouter } from './auth.js';
import { productsRouter } from './products.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  // pequeño healthcheck
  const db = await getDb();
  const row = await db.get(`SELECT 1 as ok`);
  res.json({ status: 'ok', db: row?.ok === 1 });
});

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

// endpoint público para probar seguridad
app.get('/api/public-info', (_req, res) => res.json({ info: 'publica' }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));
