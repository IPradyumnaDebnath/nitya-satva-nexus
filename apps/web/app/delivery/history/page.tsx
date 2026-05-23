'use client';

import { useState } from 'react';
import type { DeliveryTask } from '../../lib/types';
import { MOCK_TODAY_DELIVERIES } from '../../lib/mockData';

// Synthetic past 7 days of delivery history for the mock
// TODO: Replace with API call → GET /api/delivery-partner/me/tasks/history?from=<date>&to=<date>
function buildHistoryData(): { date: string; tasks: DeliveryTask[] }[] {
  const days = [
    { date: '2026-05-20', label: 'Today' },
    { date: '2026-05-19', label: 'Yesterday' },
    { date: '2026-05-18', label: 'Sun, 18 May' },
    { date: '2026-05-17', label: 'Sat, 17 May' },
    { date: '2026-05-16', label: 'Fri, 16 May' },
    { date: '2026-05-15', label: 'Thu, 15 May' },
    { date: '2026-05-14', label: 'Wed, 14 May' },
  ];

  return days.map(({ date }) => ({
    date,
    tasks: MOCK_TODAY_DELIVERIES.map((t) => ({
      ...t,
      // Simulate slightly different statuses for past days
      status:
        date === '2026-05-20'
          ? t.status
          : date === '2026-05-19'
          ? (t.id === 'd8' ? 'failed' : 'delivered')
          : 'delivered',
    })) as DeliveryTask[],
  }));
}

const HISTORY = buildHistoryData();

const DATE_LABELS: Record<string, string> = {
  '2026-05-20': 'Today',
  '2026-05-19': 'Yesterday',
  '2026-05-18': 'Sun, 18 May',
  '2026-05-17': 'Sat, 17 May',
  '2026-05-16': 'Fri, 16 May',
  '2026-05-15': 'Thu, 15 May',
  '2026-05-14': 'Wed, 14 May',
};

export default function DeliveryHistoryPage() {
  const [selectedDate, setSelectedDate] = useState('2026-05-20');

  const dayData = HISTORY.find((h) => h.date === selectedDate);
  const tasks = dayData?.tasks ?? [];
  const deliveredCount = tasks.filter((t) => t.status === 'delivered').length;
  const failedCount = tasks.filter((t) => t.status === 'failed').length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Delivery History</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
          Last 7 days of your deliveries
        </p>
      </div>

      {/* ── Week summary cards ────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {HISTORY.map(({ date, tasks: dayTasks }) => {
          const done = dayTasks.filter((t) => t.status === 'delivered').length;
          const total = dayTasks.length;
          const isSelected = selectedDate === date;
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              style={{
                padding: '12px 6px',
                borderRadius: 12,
                border: `2px solid ${isSelected ? 'var(--green-700)' : 'transparent'}`,
                background: isSelected ? 'var(--green-50)' : 'white',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: isSelected ? 'var(--green-700)' : 'var(--text-muted)', textTransform: 'uppercase' }}>
                {DATE_LABELS[date]?.split(', ')[0] ?? date}
              </div>
              <div style={{ fontWeight: 800, fontSize: 18, margin: '4px 0', color: isSelected ? 'var(--green-700)' : 'var(--text-dark)' }}>
                {done}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>/{total}</div>
            </button>
          );
        })}
      </div>

      {/* ── Day detail ────────────────────────────────────── */}
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>{DATE_LABELS[selectedDate] ?? selectedDate}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 3 }}>
              {tasks.length} deliveries scheduled
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, textAlign: 'center' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#0a6b33' }}>{deliveredCount}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Delivered</div>
            </div>
            {failedCount > 0 && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#9b1c1c' }}>{failedCount}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Failed</div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Slot</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-muted)', textAlign: 'center', width: 40 }}>
                  {task.sequence}
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{task.customerName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {task.address}
                  </div>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-medium)' }}>{task.itemsSummary}</td>
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
                    {task.slot}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{task.phone}</td>
                <td>
                  {task.status === 'delivered' && (
                    <span className="badge badge-delivered">✓ Delivered</span>
                  )}
                  {task.status === 'failed' && (
                    <span className="badge badge-failed">✗ Failed</span>
                  )}
                  {task.status === 'pending' && (
                    <span className="badge badge-pending">Pending</span>
                  )}
                </td>
                <td style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 160 }}>
                  {task.notes || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
