import Link from 'next/link';

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/orders', label: 'Orders', icon: '📋' },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: '🔄' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        style={{
          width: 236,
          background: 'var(--green-900)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '20px 20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ color: 'white', fontWeight: 800, fontSize: 18, letterSpacing: '-0.3px' }}>
            🥛 Nitya Satva
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 5,
              display: 'inline-block',
              marginTop: 6,
              letterSpacing: '0.05em',
            }}
          >
            ADMIN PORTAL
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {SIDEBAR_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.75)',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 2,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 18 }}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom: switch view */}
        <div
          style={{
            padding: '12px 10px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 8,
              color: 'rgba(255,255,255,0.45)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            ← Customer View
          </Link>
          <Link
            href="/delivery"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 8,
              color: 'rgba(255,255,255,0.45)',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            🛵 Delivery View
          </Link>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────── */}
      <div style={{ marginLeft: 236, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header
          style={{
            background: 'white',
            borderBottom: '1px solid var(--border)',
            padding: '0 28px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
            Wednesday, 20 May 2026
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              style={{
                background: '#fde8eb',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 13,
                fontWeight: 600,
                color: '#9b1c1c',
                cursor: 'pointer',
              }}
            >
              🔔 3 alerts
            </button>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'var(--green-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                cursor: 'pointer',
                border: '2px solid var(--green-200)',
              }}
              title="Admin User"
            >
              👤
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflow: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
