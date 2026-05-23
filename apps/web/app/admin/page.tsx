'use client';

import Link from 'next/link';
import { MOCK_DASHBOARD_STATS, MOCK_ORDERS, MOCK_WEEKLY_REVENUE, MOCK_PRODUCTS } from '../lib/mockData';

export default function AdminDashboardPage() {
  const stats = MOCK_DASHBOARD_STATS;
  const recentOrders = [...MOCK_ORDERS].slice(0, 5);
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < 40);
  const maxRevenue = Math.max(...MOCK_WEEKLY_REVENUE.map((r) => r.revenue));

  const statusBadgeClass: Record<string, string> = {
    delivered: 'badge-delivered',
    'out-for-delivery': 'badge-out-for-delivery',
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    cancelled: 'badge-cancelled',
  };

  return (
    <div style={{ padding: '28px 28px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 14 }}>
          Live overview for today
        </p>
      </div>

      {/* ── Stat cards ───────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {[
          {
            label: "Today's Revenue",
            value: `₹${stats.todayRevenue.toLocaleString('en-IN')}`,
            icon: '💰',
            change: '+12% vs yesterday',
            positive: true,
          },
          {
            label: 'Active Subscriptions',
            value: stats.totalActiveSubscriptions.toLocaleString('en-IN'),
            icon: '🔄',
            change: `${stats.totalActiveUsers.toLocaleString('en-IN')} total users`,
            positive: true,
          },
          {
            label: "Today's Deliveries",
            value: `${stats.todayCompletedDeliveries}/${stats.todayDeliveries}`,
            icon: '🛵',
            change: `${stats.todayDeliveries - stats.todayCompletedDeliveries} pending`,
            positive: false,
          },
          {
            label: 'Pending Orders',
            value: stats.pendingOrders,
            icon: '⏳',
            change: `${stats.lowStockProducts} low stock alerts`,
            positive: false,
          },
        ].map(({ label, value, icon, change, positive }) => (
          <div
            key={label}
            className="card"
            style={{ padding: '20px 22px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {label}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-dark)', marginTop: 8, lineHeight: 1 }}>
                  {value}
                </div>
                <div style={{ fontSize: 12, marginTop: 8, color: positive ? 'var(--green-700)' : '#856404', fontWeight: 600 }}>
                  {change}
                </div>
              </div>
              <div style={{ fontSize: 32, marginTop: 2 }}>{icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* ── Revenue chart ────────────────────────────── */}
        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Revenue — Last 7 Days</h2>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Total: ₹{MOCK_WEEKLY_REVENUE.reduce((s, r) => s + r.revenue, 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div
            style={{
              padding: '24px 22px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              height: 180,
            }}
          >
            {MOCK_WEEKLY_REVENUE.map(({ day, revenue }) => {
              const heightPct = (revenue / maxRevenue) * 100;
              const isToday = day === 'Sun';
              return (
                <div
                  key={day}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: isToday ? 'var(--green-700)' : 'var(--text-muted)',
                    }}
                  >
                    ₹{Math.round(revenue / 1000)}k
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: isToday
                        ? 'var(--green-700)'
                        : 'var(--green-200)',
                      borderRadius: '5px 5px 0 0',
                      minHeight: 6,
                      transition: 'height 0.3s',
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: isToday ? 'var(--green-700)' : 'var(--text-muted)',
                    }}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Low stock alerts ─────────────────────────── */}
        <div className="card">
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>⚠ Low Stock</h2>
            <Link href="/admin/products" style={{ fontSize: 13, color: 'var(--green-700)', fontWeight: 600 }}>
              Manage →
            </Link>
          </div>
          <div style={{ padding: '12px 0' }}>
            {lowStockProducts.length === 0 ? (
              <div style={{ padding: '20px 22px', color: 'var(--text-muted)', textAlign: 'center', fontSize: 14 }}>
                All products well-stocked ✓
              </div>
            ) : (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    padding: '12px 22px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f0f4f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{product.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{product.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                        {product.unit}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 18,
                        color: product.stock < 10 ? '#9b1c1c' : '#856404',
                      }}
                    >
                      {product.stock}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>units left</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Recent orders ────────────────────────────────── */}
      <div className="card">
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: 13, color: 'var(--green-700)', fontWeight: 600 }}>
            View All →
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Items</th>
              <th>Total</th>
              <th>Delivery</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 700, color: 'var(--green-700)', fontSize: 13 }}>
                  {order.id}
                </td>
                <td style={{ fontWeight: 600 }}>{order.userName}</td>
                <td>
                  <span
                    style={{
                      fontSize: 12,
                      padding: '3px 8px',
                      borderRadius: 5,
                      background: order.type === 'subscription' ? 'var(--green-100)' : 'var(--orange-100)',
                      color: order.type === 'subscription' ? 'var(--green-700)' : 'var(--orange-500)',
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
                  {new Date(order.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </td>
                <td>
                  <span className={`badge ${statusBadgeClass[order.status] ?? ''}`}>
                    {order.status.replace(/-/g, ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
