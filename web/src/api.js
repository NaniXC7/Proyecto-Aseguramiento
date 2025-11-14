const BASE = import.meta.env.VITE_API || 'http://localhost:4000/api';

export async function login(email, password) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function listProducts(token) {
  const res = await fetch(`${BASE}/products`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unauthorized or fetch error');
  return res.json();
}

export async function createProduct(token, data) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}
