'use client';

import { useState } from 'react';
import type { Product } from '../../lib/types';
import { MOCK_PRODUCTS } from '../../lib/mockData';

export default function AdminProductsPage() {
  // TODO: Replace with API call → GET /api/products (admin includes stock, all availability)
  const [products, setProducts] = useState<Product[]>([...MOCK_PRODUCTS]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'dairy',
    price: 0,
    unit: '',
    emoji: '🥛',
    description: '',
    available: true,
    stock: 0,
  });

  function toggleAvailability(productId: string): void {
    // TODO: API call → PATCH /api/products/:id { available }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, available: !p.available } : p,
      ),
    );
  }

  function handleAddProduct(): void {
    // TODO: API call → POST /api/products
    if (!newProduct.name || !newProduct.unit) return;
    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name ?? '',
      category: newProduct.category as Product['category'] ?? 'dairy',
      price: newProduct.price ?? 0,
      unit: newProduct.unit ?? '',
      emoji: newProduct.emoji ?? '🥛',
      description: newProduct.description ?? '',
      available: newProduct.available ?? true,
      stock: newProduct.stock ?? 0,
    };
    setProducts((prev) => [product, ...prev]);
    setShowAddForm(false);
    setNewProduct({ name: '', category: 'dairy', price: 0, unit: '', emoji: '🥛', description: '', available: true, stock: 0 });
  }

  function updateStock(productId: string, stock: number): void {
    // TODO: API call → PATCH /api/products/:id { stock }
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock } : p)),
    );
  }

  return (
    <div style={{ padding: '28px 28px' }}>
      <div
        style={{
          marginBottom: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Products</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
            {products.filter((p) => p.available).length} active ·{' '}
            {products.filter((p) => !p.available).length} unavailable
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* ── Add product form ──────────────────────────────── */}
      {showAddForm && (
        <div
          className="card"
          style={{
            padding: '24px 28px',
            marginBottom: 24,
            border: '2px solid var(--green-200)',
          }}
        >
          <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
            New Product
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label>Emoji</label>
              <input
                value={newProduct.emoji}
                onChange={(e) => setNewProduct((p) => ({ ...p, emoji: e.target.value }))}
                placeholder="🥛"
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Product Name</label>
              <input
                value={newProduct.name}
                onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Full Cream Milk"
              />
            </div>
            <div>
              <label>Category</label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct((p) => ({
                    ...p,
                    category: e.target.value as Product['category'],
                  }))
                }
              >
                <option value="dairy">Dairy</option>
                <option value="greens">Greens</option>
                <option value="eggs">Eggs</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label>Price (₹)</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct((p) => ({ ...p, price: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label>Unit</label>
              <input
                value={newProduct.unit}
                onChange={(e) => setNewProduct((p) => ({ ...p, unit: e.target.value }))}
                placeholder="500ml, 200g, 6 pcs…"
              />
            </div>
            <div>
              <label>Initial Stock</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct((p) => ({ ...p, stock: Number(e.target.value) }))}
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Description</label>
              <input
                value={newProduct.description}
                onChange={(e) => setNewProduct((p) => ({ ...p, description: e.target.value }))}
                placeholder="Short product description…"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddProduct}
              disabled={!newProduct.name || !newProduct.unit}
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* ── Products table ────────────────────────────────── */}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{product.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{product.name}</div>
                      <div
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: 12,
                          maxWidth: 220,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge badge-${product.category}`}>
                    {product.category}
                  </span>
                </td>
                <td style={{ fontWeight: 700, fontSize: 15 }}>₹{product.price}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{product.unit}</td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="number"
                      defaultValue={product.stock}
                      style={{ width: 80, padding: '4px 8px', fontSize: 13 }}
                      onBlur={(e) => {
                        updateStock(product.id, Number(e.target.value));
                        setEditingId(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <span
                      style={{
                        fontWeight: 700,
                        color:
                          product.stock < 10
                            ? '#9b1c1c'
                            : product.stock < 40
                            ? '#856404'
                            : 'var(--text-dark)',
                        cursor: 'pointer',
                      }}
                      onClick={() => setEditingId(product.id)}
                      title="Click to edit stock"
                    >
                      {product.stock}
                    </span>
                  )}
                </td>
                <td>
                  {/* Toggle switch */}
                  <button
                    onClick={() => toggleAvailability(product.id)}
                    style={{
                      background: product.available ? 'var(--green-700)' : '#e5e7eb',
                      border: 'none',
                      borderRadius: 20,
                      width: 44,
                      height: 24,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}
                    title={product.available ? 'Click to disable' : 'Click to enable'}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 3,
                        left: product.available ? 22 : 3,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    />
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => alert(`TODO: Edit form for ${product.name}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ background: '#fde8eb', color: '#9b1c1c', border: 'none', cursor: 'pointer' }}
                      onClick={() => {
                        if (confirm(`Delete "${product.name}"?`)) {
                          // TODO: API call → DELETE /api/products/:id
                          setProducts((prev) => prev.filter((p) => p.id !== product.id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
