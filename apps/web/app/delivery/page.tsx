'use client';

import { useState } from 'react';
import type { DeliveryTask, DeliveryStatus, DeliverySlot } from '../lib/types';
import { MOCK_TODAY_DELIVERIES } from '../lib/mockData';

const SLOT_ORDER: DeliverySlot[] = ['6AM-8AM', '7AM-9AM', '8AM-10AM'];

export default function DeliveryTodayPage() {
  // TODO: Replace with API call → GET /api/delivery-partner/me/tasks/today
  const [tasks, setTasks] = useState<DeliveryTask[]>([...MOCK_TODAY_DELIVERIES]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function updateStatus(taskId: string, status: DeliveryStatus): void {
    // TODO: API call → PATCH /api/delivery-tasks/:id { status }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    );
  }

  function updateNote(taskId: string, notes: string): void {
    // TODO: API call → PATCH /api/delivery-tasks/:id { notes }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, notes } : t)),
    );
  }

  const totalCount = tasks.length;
  const deliveredCount = tasks.filter((t) => t.status === 'delivered').length;
  const failedCount = tasks.filter((t) => t.status === 'failed').length;
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const progressPct = Math.round((deliveredCount / totalCount) * 100);

  const tasksBySlot = SLOT_ORDER.reduce(
    (acc, slot) => {
      acc[slot] = tasks.filter((t) => t.slot === slot).sort((a, b) => a.sequence - b.sequence);
      return acc;
    },
    {} as Record<DeliverySlot, DeliveryTask[]>,
  );

  const statusConfig = {
    pending: { label: 'Pending', bg: '#fff3cd', color: '#856404', dot: '#f59e0b' },
    delivered: { label: '✓ Delivered', bg: '#d1f5e0', color: '#0a6b33', dot: '#10b981' },
    failed: { label: '✗ Failed', bg: '#fde8eb', color: '#9b1c1c', dot: '#ef4444' },
  };

  return (
    <div>
      {/* ── Header summary ───────────────────────────────── */}
      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: '20px 24px',
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Good morning! 🌅</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
            Wednesday, 20 May 2026 · Your delivery route
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            { label: 'Total', value: totalCount, color: 'var(--text-dark)' },
            { label: 'Done', value: deliveredCount, color: '#0a6b33' },
            { label: 'Pending', value: pendingCount, color: '#856404' },
            { label: 'Failed', value: failedCount, color: '#9b1c1c' },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                textAlign: 'center',
                padding: '10px 8px',
                borderRadius: 10,
                background: 'var(--bg-page)',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-muted)',
              marginBottom: 6,
            }}
          >
            <span>Progress</span>
            <span>{progressPct}% complete</span>
          </div>
          <div
            style={{
              height: 10,
              background: 'var(--border)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPct}%`,
                background: 'linear-gradient(90deg, var(--green-500), var(--green-700))',
                borderRadius: 10,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Delivery tasks by slot ────────────────────────── */}
      {SLOT_ORDER.map((slot) => {
        const slotTasks = tasksBySlot[slot];
        if (slotTasks.length === 0) return null;
        const slotDone = slotTasks.filter((t) => t.status === 'delivered').length;

        return (
          <div key={slot} style={{ marginBottom: 28 }}>
            {/* Slot header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    background: 'var(--green-700)',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 20,
                  }}
                >
                  🕐 {slot}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {slotTasks.length} deliveries
                </span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-700)' }}>
                {slotDone}/{slotTasks.length} done
              </span>
            </div>

            {/* Task cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {slotTasks.map((task) => {
                const config = statusConfig[task.status];
                const isExpanded = expandedId === task.id;

                return (
                  <div
                    key={task.id}
                    style={{
                      background: 'white',
                      borderRadius: 14,
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: `1.5px solid ${task.status === 'delivered' ? '#d1f5e0' : task.status === 'failed' ? '#fde8eb' : 'transparent'}`,
                      opacity: task.status === 'delivered' ? 0.75 : 1,
                    }}
                  >
                    {/* Card header */}
                    <div
                      style={{
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        cursor: 'pointer',
                      }}
                      onClick={() => setExpandedId(isExpanded ? null : task.id)}
                    >
                      {/* Sequence badge */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: task.status === 'delivered'
                            ? '#d1f5e0'
                            : task.status === 'failed'
                            ? '#fde8eb'
                            : 'var(--green-100)',
                          color: task.status === 'delivered'
                            ? '#0a6b33'
                            : task.status === 'failed'
                            ? '#9b1c1c'
                            : 'var(--green-700)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {task.status === 'delivered' ? '✓' : task.status === 'failed' ? '✗' : task.sequence}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{task.customerName}</div>
                        <div
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: 13,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {task.address}
                        </div>
                        <div
                          style={{
                            color: 'var(--green-700)',
                            fontSize: 12,
                            fontWeight: 600,
                            marginTop: 2,
                          }}
                        >
                          {task.itemsSummary}
                        </div>
                      </div>

                      {/* Status badge + expand */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            background: config.bg,
                            color: config.color,
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: 20,
                          }}
                        >
                          {config.label}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1 }}>
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div
                        style={{
                          padding: '0 18px 18px',
                          borderTop: '1px solid var(--border)',
                          paddingTop: 16,
                        }}
                      >
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 12,
                            marginBottom: 14,
                          }}
                        >
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Phone
                            </div>
                            <a
                              href={`tel:${task.phone}`}
                              style={{
                                fontWeight: 700,
                                color: 'var(--green-700)',
                                fontSize: 15,
                                marginTop: 3,
                                display: 'block',
                              }}
                            >
                              {task.phone}
                            </a>
                          </div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              Full Address
                            </div>
                            <div style={{ fontSize: 13, marginTop: 3, lineHeight: 1.4 }}>
                              {task.address}
                            </div>
                          </div>
                        </div>

                        {task.notes && (
                          <div
                            style={{
                              background: '#fff3cd',
                              border: '1px solid #ffd966',
                              borderRadius: 8,
                              padding: '8px 12px',
                              fontSize: 13,
                              color: '#856404',
                              marginBottom: 14,
                            }}
                          >
                            📝 {task.notes}
                          </div>
                        )}

                        {/* Notes input */}
                        <div style={{ marginBottom: 14 }}>
                          <label>Notes</label>
                          <input
                            defaultValue={task.notes}
                            placeholder="Add delivery note…"
                            onBlur={(e) => updateNote(task.id, e.target.value)}
                          />
                        </div>

                        {/* Action buttons */}
                        {task.status === 'pending' && (
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button
                              className="btn btn-primary"
                              style={{ flex: 1 }}
                              onClick={() => updateStatus(task.id, 'delivered')}
                            >
                              ✓ Mark Delivered
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ flex: 1 }}
                              onClick={() => updateStatus(task.id, 'failed')}
                            >
                              ✗ Mark Failed
                            </button>
                          </div>
                        )}
                        {task.status === 'delivered' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1, fontSize: 14, color: '#0a6b33', fontWeight: 600 }}>
                              ✓ Delivered successfully
                            </div>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => updateStatus(task.id, 'pending')}
                            >
                              Undo
                            </button>
                          </div>
                        )}
                        {task.status === 'failed' && (
                          <div style={{ display: 'flex', gap: 10 }}>
                            <button
                              className="btn btn-primary btn-sm"
                              style={{ flex: 1 }}
                              onClick={() => updateStatus(task.id, 'delivered')}
                            >
                              Mark Delivered Instead
                            </button>
                            <button
                              className="btn btn-ghost btn-sm"
                              onClick={() => updateStatus(task.id, 'pending')}
                            >
                              Retry
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
