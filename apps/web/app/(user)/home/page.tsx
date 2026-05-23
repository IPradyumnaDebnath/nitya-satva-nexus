'use client';

import Link from 'next/link';
import { MOCK_SUBSCRIPTIONS, MOCK_ORDERS } from '../../lib/mockData';

// Simulating the logged-in user being Priya Sharma (u1)
const CURRENT_USER_ID = 'u1';
const CURRENT_USER_NAME = 'Priya';

export default function UserHomePage() {
  // TODO: Replace with API call → GET /api/users/me/subscription
  const activeSubscription = MOCK_SUBSCRIPTIONS.find(
    (s) => s.userId === CURRENT_USER_ID && s.status === 'active',
  );

  // TODO: Replace with API call → GET /api/orders?userId=me&limit=5
  const recentOrders = MOCK_ORDERS.filter((o) => o.userId === CURRENT_USER_ID).slice(0, 4);

  const todayOrder = recentOrders.find((o) => o.deliveryDate === '2026-05-20');

  const statusColor: Record<string, string> = {
    delivered: '#0a6b33',
    'out-for-delivery': '#1e40af',
    pending: '#856404',
    confirmed: '#856404',
    cancelled: '#9b1c1c',
  };

  const statusBg: Record<string, string> = {
    delivered: '#d1f5e0',
    'out-for-delivery': '#dbeafe',
    pending: '#fff3cd',
    confirmed: '#fff3cd',
    cancelled: '#fde8eb',
  };

  const statusLabel: Record<string, string> = {
    delivered: '✓ Delivered',
    'out-for-delivery': '🚴 Out for Delivery',
    pending: '⏳ Pending',
    confirmed: '✓ Confirmed',
    cancelled: '✗ Cancelled',
  };

  const frequencyLabel: Record<string, string> = {
    daily: 'Every Day',
    'alternate-days': 'Alternate Days',
    weekly: 'Once a Week',
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      {/* ── Greeting ─────────────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-dark)' }}>
          Good morning, {CURRENT_USER_NAME} 🌅
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 15 }}>
          Wednesday, 20 May 2026
        </p>
      </div>

      {/* ── Today's delivery status ──────────────────────── */}
      {todayOrder && (
        <div
          style={{
            background: statusBg[todayOrder.status] ?? '#fff3cd',
            border: `1px solid ${statusColor[todayOrder.status] ?? '#856404'}30`,
            borderRadius: 14,
            padding: '20px 24px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 36 }}>🛵</div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: statusColor[todayOrder.status],
                }}
              >
                {statusLabel[todayOrder.status] ?? todayOrder.status}
              </div>
              <div style={{ color: 'var(--text-medium)', fontSize: 14, marginTop: 2 }}>
                {todayOrder.items.map((i) => `${i.quantity}× ${i.productName}`).join(', ')}
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Today&apos;s order</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-dark)' }}>
              ₹{todayOrder.total}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* ── Active subscription ──────────────────────── */}
        <div>
          {activeSubscription ? (
            <div className="card" style={{ marginBottom: 24 }}>
              <div
                style={{
                  padding: '18px 24px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Active Subscription</h2>
                <span className="badge badge-active">Active</span>
              </div>
              <div style={{ padding: '20px 24px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 16,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                      FREQUENCY
                    </div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>
                      {frequencyLabel[activeSubscription.frequency]}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                      DELIVERY SLOT
                    </div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>
                      {activeSubscription.deliverySlot}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                      NEXT DELIVERY
                    </div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>
                      {new Date(activeSubscription.nextDelivery).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>

                {/* Items list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {activeSubscription.items.map((item) => (
                    <div
                      key={item.productId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        background: 'var(--green-50)',
                        borderRadius: 8,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 500 }}>
                        {item.productName}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                        {item.quantity}× ₹{item.pricePerUnit}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      Monthly estimate:{' '}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--green-700)' }}>
                      ₹{activeSubscription.monthlyTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Link href="/my-plan" className="btn btn-ghost btn-sm">
                      Manage Plan
                    </Link>
                    <button className="btn btn-primary btn-sm">Skip Today</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="card"
              style={{
                padding: 40,
                textAlign: 'center',
                marginBottom: 24,
                background: 'var(--green-50)',
                border: '2px dashed var(--green-200)',
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>🥛</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                No Active Subscription
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
                Subscribe to get farm-fresh products delivered daily.
              </p>
              <Link href="/subscribe" className="btn btn-primary">
                Start Subscribing
              </Link>
            </div>
          )}

          {/* ── Recent Orders ────────────────────────────── */}
          <div className="card">
            <div
              style={{
                padding: '18px 24px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h2>
              <Link
                href="/products"
                style={{ fontSize: 13, color: 'var(--green-700)', fontWeight: 600 }}
              >
                Order Again →
              </Link>
            </div>
            <div>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    padding: '14px 24px',
                    borderBottom: '1px solid #f0f4f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{order.id}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>
                      {order.items.map((i) => `${i.quantity}× ${i.productName}`).join(', ')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      className={`badge badge-${order.status.replace(/ /g, '-')}`}
                      style={{ marginBottom: 4, display: 'block' }}
                    >
                      {order.status.replace(/-/g, ' ')}
                    </span>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>₹{order.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Quick Actions */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }}>
                📦 Add Extra Today
              </button>
              <Link
                href="/my-plan"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                ⏸ Pause Subscription
              </Link>
              <Link
                href="/products"
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start' }}
              >
                🛒 Shop Products
              </Link>
            </div>
          </div>

          {/* Delivery address */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Delivery Address</h3>
            <p style={{ color: 'var(--text-medium)', fontSize: 13, lineHeight: 1.6 }}>
              {activeSubscription?.deliveryAddress ?? '—'}
            </p>
            <button
              className="btn btn-ghost btn-sm"
              style={{ marginTop: 12, width: '100%' }}
            >
              Change Address
            </button>
          </div>

          {/* Wallet */}
          <div
            className="card"
            style={{
              padding: 20,
              background: 'linear-gradient(135deg, var(--green-700), var(--green-900))',
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600 }}>
              WALLET BALANCE
            </div>
            <div
              style={{ color: 'white', fontSize: 28, fontWeight: 800, margin: '8px 0 16px' }}
            >
              ₹320
            </div>
            <button
              className="btn btn-sm"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                width: '100%',
              }}
            >
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
