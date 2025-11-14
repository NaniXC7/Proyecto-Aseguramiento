import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDb } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

export const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email y password son requeridos' });
  const db = await getDb();
  const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id, email }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ access_token: token, token_type: 'Bearer' });
});

// middleware de protección
export function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const [type, token] = auth.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
