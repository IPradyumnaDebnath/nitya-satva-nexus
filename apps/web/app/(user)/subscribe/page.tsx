'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Product, SubscriptionFrequency, DeliverySlot } from '../../lib/types';
import { MOCK_PRODUCTS } from '../../lib/mockData';

type Step = 1 | 2 | 3;

interface SelectedItem {
  product: Product;
  quantity: number;
}

const FREQUENCY_OPTIONS: { value: SubscriptionFrequency; label: string; description: string }[] =
  [
    {
      value: 'daily',
      label: 'Every Day',
      description: 'Fresh delivery 7 days a week. Best value.',
    },
    {
      value: 'alternate-days',
      label: 'Alternate Days',
      description: 'Delivery on Monday, Wednesday, Friday, Sunday.',
    },
    {
      value: 'weekly',
      label: 'Once a Week',
      description: 'One bulk delivery on your chosen day.',
    },
  ];

const SLOT_OPTIONS: { value: DeliverySlot; label: string }[] = [
  { value: '6AM-8AM', label: '6:00 AM – 8:00 AM' },
  { value: '7AM-9AM', label: '7:00 AM – 9:00 AM' },
  { value: '8AM-10AM', label: '8:00 AM – 10:00 AM' },
];

export default function SubscribePage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [frequency, setFrequency] = useState<SubscriptionFrequency>('daily');
  const [slot, setSlot] = useState<DeliverySlot>('6AM-8AM');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const availableProducts = MOCK_PRODUCTS.filter((p) => p.available);

  function getQuantity(productId: string): number {
    return selectedItems.find((i) => i.product.id === productId)?.quantity ?? 0;
  }

  function updateQuantity(product: Product, delta: number): void {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (!existing) {
        if (delta <= 0) return prev;
        return [...prev, { product, quantity: delta }];
      }
      const newQty = existing.quantity + delta;
      if (newQty <= 0) return prev.filter((i) => i.product.id !== product.id);
      return prev.map((i) =>
        i.product.id === product.id ? { ...i, quantity: newQty } : i,
      );
    });
  }

  const dailyTotal = selectedItems.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const frequencyMultiplier = { daily: 30, 'alternate-days': 15, weekly: 4 };
  const monthlyEstimate = dailyTotal * frequencyMultiplier[frequency];

  // TODO: Replace with API call → POST /api/subscriptions
  function handleConfirm(): void {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: 600,
          margin: '80px auto',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--green-700)', marginBottom: 12 }}>
          Subscription Confirmed!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.65, marginBottom: 32 }}>
          Your first delivery will arrive tomorrow between {slot}. We&apos;ll send you a
          confirmation SMS shortly.
        </p>
        <div
          style={{
            background: 'var(--green-50)',
            border: '1px solid var(--green-200)',
            borderRadius: 14,
            padding: 24,
            marginBottom: 32,
            textAlign: 'left',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Your Plan Summary</div>
          {selectedItems.map((i) => (
            <div
              key={i.product.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              <span>
                {i.quantity}× {i.product.name}
              </span>
              <span>₹{i.product.price * i.quantity}/delivery</span>
            </div>
          ))}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              marginTop: 12,
              paddingTop: 12,
              fontWeight: 700,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Monthly Estimate</span>
            <span style={{ color: 'var(--green-700)' }}>
              ₹{monthlyEstimate.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <Link href="/home" className="btn btn-primary btn-lg">
          Go to My Dashboard →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Start Your Subscription</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>First 7 days free. Cancel anytime.</p>
      </div>

      {/* ── Step indicator ───────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 40 }}>
        {([1, 2, 3] as Step[]).map((s, idx) => {
          const isActive = step === s;
          const isDone = step > s;
          const labels = ['Choose Products', 'Set Frequency', 'Confirm'];
          return (
            <div
              key={s}
              style={{ display: 'flex', alignItems: 'center', flex: idx < 2 ? 1 : 'initial' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isDone
                      ? 'var(--green-500)'
                      : isActive
                      ? 'var(--green-700)'
                      : 'var(--border)',
                    color: isDone || isActive ? 'white' : 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {isDone ? '✓' : s}
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-dark)' : 'var(--text-muted)',
                  }}
                >
                  {labels[idx]}
                </span>
              </div>
              {idx < 2 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: isDone ? 'var(--green-500)' : 'var(--border)',
                    margin: '0 12px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Step 1: Choose products ───────────────────────── */}
      {step === 1 && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
              marginBottom: 32,
            }}
          >
            {availableProducts.map((product) => {
              const qty = getQuantity(product.id);
              const isSelected = qty > 0;
              return (
                <div
                  key={product.id}
                  className="card"
                  style={{
                    padding: 18,
                    border: isSelected
                      ? '2px solid var(--green-500)'
                      : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => updateQuantity(product, qty === 0 ? 1 : 0)}
                >
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{product.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {product.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 12 }}>
                    {product.unit}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontWeight: 800, color: 'var(--green-700)' }}>
                      ₹{product.price}
                    </span>
                    {isSelected ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          background: 'var(--green-50)',
                          border: '1px solid var(--green-200)',
                          borderRadius: 6,
                          padding: '2px 8px',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(product, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 16,
                            fontWeight: 700,
                            color: 'var(--green-700)',
                          }}
                        >
                          −
                        </button>
                        <span style={{ fontWeight: 700, minWidth: 14, textAlign: 'center' }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(product, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 16,
                            fontWeight: 700,
                            color: 'var(--green-700)',
                          }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--green-500)', fontWeight: 600 }}>
                        + Select
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedItems.length > 0 && (
            <div
              style={{
                background: 'var(--green-50)',
                border: '1px solid var(--green-200)',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 14, color: 'var(--text-medium)' }}>
                {selectedItems.length} product{selectedItems.length > 1 ? 's' : ''} selected ·{' '}
                <strong>₹{dailyTotal}/delivery</strong>
              </div>
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Next: Set Frequency →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Step 2: Frequency & slot ──────────────────────── */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
            Delivery Frequency
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
            {FREQUENCY_OPTIONS.map(({ value, label, description }) => (
              <div
                key={value}
                onClick={() => setFrequency(value)}
                style={{
                  background: frequency === value ? 'var(--green-50)' : 'white',
                  border: `2px solid ${frequency === value ? 'var(--green-500)' : 'var(--border)'}`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{label}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>
                    {description}
                  </div>
                </div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${frequency === value ? 'var(--green-500)' : 'var(--border)'}`,
                    background: frequency === value ? 'var(--green-500)' : 'white',
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
            Preferred Delivery Slot
          </h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 36 }}>
            {SLOT_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setSlot(value)}
                className={slot === value ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1 }}
              >
                {label}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
            Delivery Address
          </h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your full delivery address with pincode…"
            rows={3}
            style={{ marginBottom: 24, resize: 'vertical' }}
          />

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => setStep(3)}
              disabled={!address.trim()}
            >
              Review Order →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Confirm ───────────────────────────────── */}
      {step === 3 && (
        <div>
          <div
            className="card"
            style={{ padding: '24px 28px', marginBottom: 20 }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Order Summary</h3>
            {selectedItems.map((i) => (
              <div
                key={i.product.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  padding: '8px 0',
                  borderBottom: '1px solid #f0f4f0',
                }}
              >
                <span>
                  {i.product.emoji} {i.quantity}× {i.product.name} ({i.product.unit})
                </span>
                <span style={{ fontWeight: 600 }}>₹{i.product.price * i.quantity}</span>
              </div>
            ))}
            <div
              style={{
                paddingTop: 14,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginTop: 4,
              }}
            >
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600 }}>Frequency:</span>{' '}
                {FREQUENCY_OPTIONS.find((f) => f.value === frequency)?.label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600 }}>Slot:</span> {slot}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', gridColumn: '1/-1' }}>
                <span style={{ fontWeight: 600 }}>Address:</span> {address}
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'var(--green-50)',
              border: '1px solid var(--green-200)',
              borderRadius: 12,
              padding: '18px 22px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Per delivery</div>
              <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--text-dark)' }}>
                ₹{dailyTotal}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Monthly estimate</div>
              <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--green-700)' }}>
                ₹{monthlyEstimate.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>First week</div>
              <div style={{ fontWeight: 800, fontSize: 22, color: 'var(--orange-500)' }}>
                FREE 🎉
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => setStep(2)}>
              ← Back
            </button>
            <button className="btn btn-orange btn-lg" style={{ flex: 1 }} onClick={handleConfirm}>
              Confirm Subscription →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
