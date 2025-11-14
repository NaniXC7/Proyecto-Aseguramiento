import express from 'express';
import { getDb } from './db.js';
import { requireAuth } from './auth.js';

export const productsRouter = express.Router();

// protegido
productsRouter.use(requireAuth);

// lista
productsRouter.get('/', async (_req, res) => {
  const db = await getDb();
  const items = await db.all(`SELECT * FROM products ORDER BY id DESC`);
  res.json(items);
});

// crear
productsRouter.post('/', async (req, res) => {
  const { name, price } = req.body || {};
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'name y price (number) requeridos' });
  }
  const db = await getDb();
  const result = await db.run(`INSERT INTO products(name, price) VALUES(?,?)`, [name, price]);
  const created = await db.get(`SELECT * FROM products WHERE id=?`, [result.lastID]);
  res.status(201).json(created);
});

// obtener por id
productsRouter.get('/:id', async (req, res) => {
  const db = await getDb();
  const row = await db.get(`SELECT * FROM products WHERE id=?`, [req.params.id]);
  if (!row) return res.status(404).json({ message: 'Not found' });
  res.json(row);
});
