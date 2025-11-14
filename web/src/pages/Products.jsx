import React, { useEffect, useState } from 'react'
import { listProducts, createProduct } from '../api.js'

export default function Products({ token, onLogout }) {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  async function refresh() {
    const data = await listProducts(token)
    setItems(data)
  }

  useEffect(()=>{ refresh() }, [])

  async function onCreate(e) {
    e.preventDefault()
    await createProduct(token, { name, price: Number(price) })
    setName(''); setPrice('')
    await refresh()
  }

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 id="welcomeUser">Productos</h2>
        <button onClick={onLogout}>Salir</button>
      </div>

      <form onSubmit={onCreate} style={{margin: '1rem 0'}}>
        <input id="nombre" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)} data-testid="nameInput" />
        <input id="precio" placeholder="Precio" value={price} onChange={(e)=>setPrice(e.target.value)} data-testid="priceInput" />
        <button className="save" type="submit" data-testid="saveBtn">Guardar</button>
      </form>

      <table border="1" width="100%">
        <thead><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr></thead>
        <tbody>
          {items.map(p=>(
            <tr key={p.id}><td>{p.id}</td><td>{p.name}</td><td>{p.price}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
