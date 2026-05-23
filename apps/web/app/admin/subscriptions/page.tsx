'use client';

import { useState } from 'react';
import type { Subscription, SubscriptionStatus } from '../../lib/types';
import { MOCK_SUBSCRIPTIONS } from '../../lib/mockData';

type StatusFilter = 'all' | SubscriptionStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function AdminSubscriptionsPage() {
  // TODO: Replace with API call → GET /api/subscriptions?status=<filter>&page=<page>
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    ...MOCK_SUBSCRIPTIONS,
  ]);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

  const filtered =
    activeFilter === 'all'
      ? subscriptions
      : subscriptions.filter((s) => s.status === activeFilter);

  function setStatus(id: string, status: SubscriptionStatus): void {
    // TODO: API call → PATCH /api/subscriptions/:id { status }
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  }

  const frequencyLabel: Record<string, string> = {
    daily: 'Daily',
    'alternate-days': 'Alt. Days',
    weekly: 'Weekly',
  };

  const counts = STATUS_TABS.reduce(
    (acc, { value }) => {
      acc[value] =
        value === 'all'
          ? subscriptions.length
          : subscriptions.filter((s) => s.status === value).length;
      return acc;
    },
    {} as Record<StatusFilter, number>,
  );

  return (
    <div style={{ padding: '28px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Subscriptions</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
          {subscriptions.filter((s) => s.status === 'active').length} active subscriptions
        </p>
      </div>

      {/* ── Filter tabs ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {STATUS_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={activeFilter === value ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
          >
            {label}
            {counts[value] > 0 && (
              <span
                style={{
                  marginLeft: 6,
                  background: activeFilter === value ? 'rgba(255,255,255,0.3)' : 'var(--green-100)',
                  color: activeFilter === value ? 'white' : 'var(--green-700)',
                  borderRadius: 10,
                  padding: '1px 7px',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {counts[value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Subscriptions table ───────────────────────────── */}
      <div className="card">
        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            No subscriptions with status &quot;{activeFilter}&quot;
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Products</th>
                <th>Frequency</th>
                <th>Slot</th>
                <th>Next Delivery</th>
                <th>Monthly</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{sub.userName}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {sub.userPhone}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {sub.deliveryAddress}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {sub.items.map((item) => (
                        <span key={item.productId} style={{ fontSize: 12, color: 'var(--text-medium)' }}>
                          {item.quantity}× {item.productName}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: 12,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: 'var(--green-100)',
                        color: 'var(--green-700)',
                        fontWeight: 700,
                      }}
                    >
                      {frequencyLabel[sub.frequency]}
                    </span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sub.deliverySlot}</td>
                  <td style={{ fontSize: 13 }}>
                    {new Date(sub.nextDelivery).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ₹{sub.monthlyTotal.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className={`badge badge-${sub.status}`}>{sub.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {sub.status === 'active' && (
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => setStatus(sub.id, 'paused')}
                        >
                          Pause
                        </button>
                      )}
                      {sub.status === 'paused' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setStatus(sub.id, 'active')}
                        >
                          Activate
                        </button>
                      )}
                      {sub.status !== 'cancelled' && (
                        <button
                          className="btn btn-sm"
                          style={{
                            background: '#fde8eb',
                            color: '#9b1c1c',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (confirm(`Cancel ${sub.userName}'s subscription?`))
                              setStatus(sub.id, 'cancelled');
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      {sub.status === 'cancelled' && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setStatus(sub.id, 'active')}
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
