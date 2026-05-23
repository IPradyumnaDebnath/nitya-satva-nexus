'use client';

import { useState } from 'react';
import type { CartItem, Product } from '../../lib/types';
import { MOCK_PRODUCTS } from '../../lib/mockData';

type Category = 'all' | 'dairy' | 'greens' | 'eggs' | 'other';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All Products',
  dairy: '🥛 Dairy',
  greens: '🌱 Microgreens',
  eggs: '🥚 Eggs',
  other: 'Other',
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [cart, setCart] = useState<CartItem[]>([]);

  // TODO: Replace with API call → GET /api/products?category=<category>
  const filteredProducts =
    activeCategory === 'all'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  function getCartQuantity(productId: string): number {
    return cart.find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  function updateCart(product: Product, delta: number): void {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (!existing) {
        if (delta <= 0) return prev;
        return [...prev, { product, quantity: delta }];
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) return prev.filter((item) => item.product.id !== product.id);
      return prev.map((item) =>
        item.product.id === product.id ? { ...item, quantity: newQty } : item,
      );
    });
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Our Products</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 15 }}>
          Farm-fresh, delivered before 7 AM
        </p>
      </div>

      {/* ── Category tabs ────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* ── Product grid ─────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 20,
          marginBottom: 100,
        }}
      >
        {filteredProducts.map((product) => {
          const quantity = getCartQuantity(product.id);
          return (
            <div
              key={product.id}
              className="card"
              style={{
                opacity: product.available ? 1 : 0.55,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Product image area */}
              <div
                style={{
                  background: 'var(--green-50)',
                  padding: '32px 20px',
                  textAlign: 'center',
                  fontSize: 64,
                  position: 'relative',
                }}
              >
                {product.emoji}
                {!product.available && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: '#fde8eb',
                      color: '#9b1c1c',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                    }}
                  >
                    OUT OF STOCK
                  </div>
                )}
                <span
                  className={`badge badge-${product.category}`}
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontSize: 11,
                  }}
                >
                  {product.category}
                </span>
              </div>

              <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
                  {product.name}
                </h3>
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    flex: 1,
                    marginBottom: 14,
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--green-700)' }}>
                      ₹{product.price}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13, marginLeft: 4 }}>
                      /{product.unit}
                    </span>
                  </div>

                  {product.available ? (
                    quantity === 0 ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => updateCart(product, 1)}
                      >
                        + Add
                      </button>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          background: 'var(--green-50)',
                          border: '1.5px solid var(--green-200)',
                          borderRadius: 8,
                          padding: '4px 10px',
                        }}
                      >
                        <button
                          onClick={() => updateCart(product, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 18,
                            color: 'var(--green-700)',
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCart(product, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 18,
                            color: 'var(--green-700)',
                            fontWeight: 700,
                            lineHeight: 1,
                          }}
                        >
                          +
                        </button>
                      </div>
                    )
                  ) : (
                    <button className="btn btn-ghost btn-sm" disabled>
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Floating cart bar ────────────────────────────── */}
      {cartCount > 0 && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--green-900)',
            color: 'white',
            borderRadius: 16,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: 50,
            minWidth: 340,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                background: 'var(--orange-500)',
                borderRadius: '50%',
                width: 26,
                height: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {cartCount}
            </div>
            <span style={{ fontSize: 14 }}>
              {cartCount} item{cartCount > 1 ? 's' : ''} in cart
            </span>
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontWeight: 800, fontSize: 18 }}>
            ₹{cartTotal}
          </div>
          <button
            className="btn btn-orange btn-sm"
            style={{ flexShrink: 0 }}
            onClick={() => alert('TODO: Connect to checkout flow')}
          >
            Checkout →
          </button>
        </div>
      )}
    </div>
  );
}
