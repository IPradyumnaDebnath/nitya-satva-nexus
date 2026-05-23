'use client';

import { useState } from 'react';
import type { SubscriptionStatus } from '../../lib/types';
import { MOCK_SUBSCRIPTIONS } from '../../lib/mockData';

const CURRENT_USER_ID = 'u1';

// Next 7 upcoming delivery dates from today
const UPCOMING_DELIVERIES = [
  { date: '2026-05-21', day: 'Thu' },
  { date: '2026-05-22', day: 'Fri' },
  { date: '2026-05-23', day: 'Sat' },
  { date: '2026-05-24', day: 'Sun' },
  { date: '2026-05-25', day: 'Mon' },
  { date: '2026-05-26', day: 'Tue' },
  { date: '2026-05-27', day: 'Wed' },
];

export default function MyPlanPage() {
  // TODO: Replace with API call → GET /api/users/me/subscriptions
  const subscription = MOCK_SUBSCRIPTIONS.find(
    (s) => s.userId === CURRENT_USER_ID && s.status === 'active',
  );

  const [status, setStatus] = useState<SubscriptionStatus>(subscription?.status ?? 'active');
  const [skippedDates, setSkippedDates] = useState<Set<string>>(new Set());
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [pauseDays, setPauseDays] = useState('7');

  if (!subscription) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>😔</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>No Active Plan</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
          You don&apos;t have an active subscription yet.
        </p>
        <a href="/subscribe" className="btn btn-primary btn-lg">
          Start a Subscription →
        </a>
      </div>
    );
  }

  function toggleSkip(date: string): void {
    setSkippedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
    // TODO: API call → PATCH /api/subscriptions/:id/skip { date }
  }

  function handlePause(): void {
    // TODO: API call → PATCH /api/subscriptions/:id { status: 'paused', pauseDays }
    setStatus('paused');
  }

  function handleResume(): void {
    // TODO: API call → PATCH /api/subscriptions/:id { status: 'active' }
    setStatus('active');
  }

  function handleCancel(): void {
    // TODO: API call → DELETE /api/subscriptions/:id
    setStatus('cancelled');
    setShowCancelConfirm(false);
  }

  const frequencyLabel: Record<string, string> = {
    daily: 'Every Day',
    'alternate-days': 'Alternate Days',
    weekly: 'Once a Week',
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>My Plan</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>
            Manage your active subscription
          </p>
        </div>
        <span className={`badge badge-${status}`} style={{ fontSize: 14, padding: '6px 16px' }}>
          {status === 'active' ? '● Active' : status === 'paused' ? '⏸ Paused' : '✗ Cancelled'}
        </span>
      </div>

      {status === 'cancelled' && (
        <div
          style={{
            background: '#fde8eb',
            border: '1px solid #f5c2c7',
            borderRadius: 12,
            padding: '18px 22px',
            marginBottom: 24,
            fontSize: 15,
            color: '#9b1c1c',
          }}
        >
          Your subscription has been cancelled. Your last delivery was today.{' '}
          <a href="/subscribe" style={{ fontWeight: 700, textDecoration: 'underline' }}>
            Resubscribe?
          </a>
        </div>
      )}

      {status === 'paused' && (
        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffd966',
            borderRadius: 12,
            padding: '18px 22px',
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 15, color: '#856404' }}>
            ⏸ Your subscription is paused. Deliveries will resume on{' '}
            <strong>
              {new Date(subscription.nextDelivery).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
              })}
            </strong>
            .
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleResume}>
            Resume Now
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 24 }}>
        {/* ── Left: plan details ───────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Subscription details */}
          <div className="card">
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border)',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Subscription Details
            </div>
            <div style={{ padding: '20px 24px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  { label: 'FREQUENCY', value: frequencyLabel[subscription.frequency] },
                  { label: 'DELIVERY SLOT', value: subscription.deliverySlot },
                  { label: 'STARTED ON', value: new Date(subscription.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                  { label: 'NEXT DELIVERY', value: new Date(subscription.nextDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em' }}>
                      {label}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>
                  Items in your plan
                </div>
                {subscription.items.map((item) => (
                  <div
                    key={item.productId}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 14px',
                      background: 'var(--green-50)',
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{item.productName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        {item.quantity}× ₹{item.pricePerUnit}
                      </span>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '2px 8px', fontSize: 12 }}
                        onClick={() =>
                          alert(
                            'TODO: API call → PATCH /api/subscriptions/:id/items { productId, quantity }',
                          )
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', marginTop: 6 }}
                  onClick={() =>
                    alert('TODO: Open product selector to add more items')
                  }
                >
                  + Add Product
                </button>
              </div>

              <div
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>Monthly estimate</span>
                <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--green-700)' }}>
                  ₹{subscription.monthlyTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Upcoming deliveries calendar */}
          <div className="card">
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border)',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Upcoming Deliveries — Tap to Skip
            </div>
            <div
              style={{
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 8,
              }}
            >
              {UPCOMING_DELIVERIES.map(({ date, day }) => {
                const isSkipped = skippedDates.has(date);
                return (
                  <button
                    key={date}
                    onClick={() => toggleSkip(date)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: `2px solid ${isSkipped ? '#fde8eb' : 'var(--green-200)'}`,
                      background: isSkipped ? '#fde8eb' : 'var(--green-50)',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isSkipped ? '#9b1c1c' : 'var(--text-muted)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {day}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        marginTop: 4,
                        color: isSkipped ? '#9b1c1c' : 'var(--text-dark)',
                      }}
                    >
                      {new Date(date).getDate()}
                    </div>
                    <div style={{ fontSize: 10, marginTop: 2, color: isSkipped ? '#9b1c1c' : 'var(--green-500)' }}>
                      {isSkipped ? 'SKIP' : '🥛'}
                    </div>
                  </button>
                );
              })}
            </div>
            {skippedDates.size > 0 && (
              <div
                style={{
                  margin: '0 24px 20px',
                  background: '#fff3cd',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 13,
                  color: '#856404',
                }}
              >
                {skippedDates.size} day{skippedDates.size > 1 ? 's' : ''} skipped. Changes
                saved automatically.
              </div>
            )}
          </div>
        </div>

        {/* ── Right: actions ───────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Pause */}
          {status === 'active' && (
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                ⏸ Pause Subscription
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>
                Going on vacation? Pause and we won&apos;t charge or deliver during the pause.
              </p>
              <div style={{ marginBottom: 12 }}>
                <label>Pause for how many days?</label>
                <select
                  value={pauseDays}
                  onChange={(e) => setPauseDays(e.target.value)}
                >
                  {['3', '7', '14', '21', '30'].map((d) => (
                    <option key={d} value={d}>
                      {d} days
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handlePause}>
                Pause Subscription
              </button>
            </div>
          )}

          {/* Delivery address */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
              📍 Delivery Address
            </h3>
            <p style={{ color: 'var(--text-medium)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
              {subscription.deliveryAddress}
            </p>
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: '100%' }}
              onClick={() => alert('TODO: Address update modal')}
            >
              Change Address
            </button>
          </div>

          {/* Cancel */}
          {status === 'active' && (
            <div
              style={{
                padding: 20,
                border: '1px solid #fde8eb',
                borderRadius: 14,
                background: 'white',
              }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#9b1c1c', marginBottom: 8 }}>
                Cancel Subscription
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>
                Sorry to see you go. All pending payments will be settled.
              </p>
              {!showCancelConfirm ? (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', color: '#9b1c1c', borderColor: '#f5c2c7' }}
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Cancel Subscription
                </button>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: '#9b1c1c', marginBottom: 12, fontWeight: 600 }}>
                    Are you sure? This cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ flex: 1 }}
                      onClick={() => setShowCancelConfirm(false)}
                    >
                      Keep Plan
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ flex: 1 }}
                      onClick={handleCancel}
                    >
                      Yes, Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
