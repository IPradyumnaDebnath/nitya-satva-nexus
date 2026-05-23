'use client';

import { useState } from 'react';
import { MOCK_USERS } from '../../lib/mockData';

export default function AdminUsersPage() {
  // TODO: Replace with API call → GET /api/users?search=<query>&page=<page>
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery),
  );

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
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>Users</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
            {MOCK_USERS.length} registered customers
          </p>
        </div>
        <div style={{ width: 300 }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone…"
          />
        </div>
      </div>

      {/* ── Summary cards ─────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: 'Total Users',
            value: MOCK_USERS.length,
            icon: '👥',
          },
          {
            label: 'Active Subscribers',
            value: MOCK_USERS.filter((u) => u.activeSubscriptions > 0).length,
            icon: '🔄',
          },
          {
            label: 'Total Revenue',
            value: `₹${MOCK_USERS.reduce((s, u) => s + u.totalSpend, 0).toLocaleString('en-IN')}`,
            icon: '💰',
          },
          {
            label: 'Avg. Orders/User',
            value: Math.round(
              MOCK_USERS.reduce((s, u) => s + u.totalOrders, 0) / MOCK_USERS.length,
            ),
            icon: '📦',
          },
        ].map(({ label, value, icon }) => (
          <div key={label} className="card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 6 }}>{value}</div>
              </div>
              <span style={{ fontSize: 28 }}>{icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Users table ───────────────────────────────────── */}
      <div className="card">
        {filteredUsers.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
            No users match &quot;{searchQuery}&quot;
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Joined</th>
                <th>Active Subs</th>
                <th>Total Orders</th>
                <th>Total Spend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: 'var(--green-100)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        👤
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{user.phone}</td>
                  <td
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      maxWidth: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.address}
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {new Date(user.joinedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {user.activeSubscriptions > 0 ? (
                      <span className="badge badge-active">{user.activeSubscriptions}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600, textAlign: 'center' }}>{user.totalOrders}</td>
                  <td style={{ fontWeight: 700, color: 'var(--green-700)' }}>
                    ₹{user.totalSpend.toLocaleString('en-IN')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                          alert(`TODO: View order history for ${user.name}`)
                        }
                      >
                        Orders
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                          alert(`TODO: View/edit subscription for ${user.name}`)
                        }
                      >
                        Plan
                      </button>
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
