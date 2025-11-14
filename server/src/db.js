import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;
export async function getDb() {
  if (!db) {
    db = await open({
      filename: './qa-demo.sqlite',
      driver: sqlite3.Database
    });
    await db.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL CHECK (price >= 0)
      );
    `);
  }
  return db;
}

// seed simple: usuario y producto demo
if (process.argv.includes('--seed')) {
  (async () => {
    const bcrypt = (await import('bcryptjs')).default;
    const db = await getDb();
    const pass = await bcrypt.hash('Pass123!', 10);
    await db.run(`INSERT OR IGNORE INTO users(email,password_hash) VALUES(?,?)`, ['user@test.com', pass]);
    await db.run(`INSERT INTO products(name, price) VALUES(?,?)`, ['Producto demo', 99.9]);
    console.log('Seed OK: user=user@test.com / Pass123! y 1 producto');
    process.exit(0);
  })();
}
