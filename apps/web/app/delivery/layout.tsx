import Link from 'next/link';

export default function DeliveryLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f9f6' }}>
      {/* ── Top bar ─────────────────────────────────────── */}
      <header
        style={{
          background: 'var(--green-700)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '0 20px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              color: 'white',
              fontWeight: 800,
              fontSize: 17,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            🛵 Nitya Satva Delivery
          </div>

          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Link
              href="/delivery"
              style={{
                padding: '5px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Today
            </Link>
            <Link
              href="/delivery/history"
              style={{
                padding: '5px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              History
            </Link>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)', margin: '0 6px' }} />
            <Link href="/" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              Customer
            </Link>
            <Link href="/admin" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>
              Admin
            </Link>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px' }}>
        {children}
      </main>
    </div>
  );
}
