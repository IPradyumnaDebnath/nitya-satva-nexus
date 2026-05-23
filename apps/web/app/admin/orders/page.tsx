'use client';

import { useState } from 'react';
import type { Order, OrderStatus } from '../../lib/types';
import { MOCK_ORDERS } from '../../lib/mockData';

type StatusFilter = 'all' | OrderStatus;

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'out-for-delivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_FLOW: OrderStatus[] = [
  'pending',
  'confirmed',
  'out-for-delivery',
  'delivered',
];

export default function AdminOrdersPage() {
  // TODO: Replace with API call → GET /api/orders?status=<filter>&page=<page>
  const [orders, setOrders] = useState<Order[]>([...MOCK_ORDERS]);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

  const filteredOrders =
    activeFilter === 'all'
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  function advanceStatus(orderId: string): void {
    // TODO: API call → PATCH /api/orders/:id { status }
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const currentIdx = STATUS_FLOW.indexOf(order.status as OrderStatus);
        const next = STATUS_FLOW[currentIdx + 1];
        return next ? { ...order, status: next } : order;
      }),
    );
  }

  function cancelOrder(orderId: string): void {
    // TODO: API call → PATCH /api/orders/:id { status: 'cancelled' }
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'cancelled' as OrderStatus } : o)),
    );
  }

  const counts = STATUS_TABS.reduce(
    (acc, { value }) => {
      acc[value] = value === 'all' ? orders.length : orders.filter((o) => o.status === value).length;
      return acc;
    },
    {} as Record<StatusFilter, number>,
  );

  const badgeClass: Record<string, string> = {
    delivered: 'badge-delivered',
    'out-for-delivery': 'badge-out-for-delivery',
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    cancelled: 'badge-cancelled',
  };

  const nextStatusLabel: Record<string, string> = {
    pending: 'Confirm',
    confirmed: 'Mark Out for Delivery',
    'out-for-delivery': 'Mark Delivered',
  };

  return (
    <div style={{ padding: '28px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Orders</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
          {orders.length} total orders today
        </p>
      </div>

      {/* ── Status filter tabs ────────────────────────────── */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {STATUS_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={activeFilter === value ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
            style={{ position: 'relative' }}
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

      {/* ── Orders table ─────────────────────────────────── */}
      <div className="card">
        {filteredOrders.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No orders with status &quot;{activeFilter}&quot;
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Items</th>
                <th>Total</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const canAdvance =
                  order.status !== 'delivered' && order.status !== 'cancelled';
                return (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 700, color: 'var(--green-700)', fontSize: 13 }}>
                      {order.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{order.userName}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-muted)',
                          maxWidth: 160,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {order.deliveryAddress}
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: 11,
                          padding: '3px 8px',
                          borderRadius: 5,
                          background:
                            order.type === 'subscription'
                              ? 'var(--green-100)'
                              : 'var(--orange-100)',
                          color:
                            order.type === 'subscription'
                              ? 'var(--green-700)'
                              : 'var(--orange-500)',
                          fontWeight: 700,
                        }}
                      >
                        {order.type === 'subscription' ? 'Sub' : 'One-time'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {order.items.map((i) => `${i.quantity}× ${i.productName}`).join(', ')}
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{order.total}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {new Date(order.deliveryDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                    <td>
                      <span className={`badge ${badgeClass[order.status] ?? ''}`}>
                        {order.status.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {canAdvance && nextStatusLabel[order.status] && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => advanceStatus(order.id)}
                          >
                            {nextStatusLabel[order.status]}
                          </button>
                        )}
                        {order.status !== 'cancelled' &&
                          order.status !== 'delivered' && (
                            <button
                              className="btn btn-sm"
                              style={{
                                background: '#fde8eb',
                                color: '#9b1c1c',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                              onClick={() => cancelOrder(order.id)}
                            >
                              Cancel
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
