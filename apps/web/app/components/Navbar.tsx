'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/home', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/subscribe', label: 'Subscribe' },
  { href: '/my-plan', label: 'My Plan' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
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
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'white',
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: '-0.3px',
            flexShrink: 0,
          }}
        >
          🥛 Nitya Satva
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.75)',
                  background: isActive ? 'rgba(255,255,255,0.18)' : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* Role switcher for demo */}
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
            Switch to:
          </span>
          <Link
            href="/admin"
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.15s',
            }}
          >
            Admin
          </Link>
          <Link
            href="/delivery"
            style={{
              padding: '5px 12px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.15s',
            }}
          >
            Delivery
          </Link>

          {/* User avatar */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              marginLeft: 4,
              cursor: 'pointer',
              border: '2px solid rgba(255,255,255,0.3)',
            }}
            title="Priya Sharma"
          >
            👤
          </div>
        </div>
      </div>
    </nav>
  );
}
