import Link from 'next/link';
import { MOCK_PRODUCTS } from './lib/mockData';

const FEATURES = [
  {
    emoji: '🌾',
    title: 'Farm Direct',
    description: 'We partner directly with local farms. No middlemen, no markup.',
  },
  {
    emoji: '🧊',
    title: 'Cold-Chain Delivery',
    description: 'Delivered in insulated pouches maintaining 4°C from farm to door.',
  },
  {
    emoji: '✅',
    title: 'Purity Guarantee',
    description: 'Every batch lab-tested. Full refund if you are ever unsatisfied.',
  },
  {
    emoji: '🔄',
    title: 'Flexible Plans',
    description: 'Skip, pause, or cancel any day — no questions asked, ever.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Meera S.',
    city: 'Bangalore',
    text: 'The milk tastes like what we had back in my village. My kids now actually finish their morning glass!',
    rating: 5,
  },
  {
    name: 'Anand R.',
    city: 'Chennai',
    text: "Best ghee I've had in years. The bilona process really makes a difference. Worth every rupee.",
    rating: 5,
  },
  {
    name: 'Sunita K.',
    city: 'Delhi',
    text: 'Super reliable. Delivered by 6:30 every single morning for 8 months straight. Incredible.',
    rating: 5,
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose Your Products',
    description: 'Browse our range of farm-fresh dairy, microgreens and eggs. Pick what you love.',
  },
  {
    step: '02',
    title: 'Set Your Frequency',
    description: 'Daily, alternate days or weekly — whatever fits your family. Change anytime.',
  },
  {
    step: '03',
    title: 'Fresh at Your Door',
    description: 'We deliver before 7 AM so you start every day with pure, fresh goodness.',
  },
];

export default function LandingPage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.available).slice(0, 6);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* ── Top bar ────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--green-700)',
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
          }}
        >
          <div
            style={{
              color: 'white',
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: '-0.3px',
            }}
          >
            🥛 Nitya Satva
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/home" className="btn btn-ghost btn-sm" style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.3)' }}>
              Sign In
            </Link>
            <Link href="/subscribe" className="btn btn-orange btn-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--green-900) 0%, var(--green-700) 55%, var(--green-500) 100%)',
          padding: '80px 24px 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 480,
            height: 480,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -80,
            bottom: -80,
            width: 320,
            height: 320,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Left: copy */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(255,255,255,0.14)',
                padding: '6px 14px',
                borderRadius: 20,
                color: 'rgba(255,255,255,0.95)',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 28,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              🌱 100% Natural · Zero Preservatives · Lab Tested
            </div>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.12,
                letterSpacing: '-1px',
              }}
            >
              Pure & Fresh
              <br />
              Daily Essentials
            </h1>
            <p
              style={{
                fontSize: 18,
                color: 'rgba(255,255,255,0.82)',
                margin: '20px 0 36px',
                lineHeight: 1.65,
                maxWidth: 440,
              }}
            >
              Farm-fresh dairy, microgreens and eggs delivered to your doorstep before 7&nbsp;AM.
              Direct from farm families we trust.
            </p>
            <div style={{ display: 'flex', gap: 14 }}>
              <Link href="/subscribe" className="btn btn-orange btn-lg">
                Start Free Trial →
              </Link>
              <Link
                href="/products"
                className="btn btn-lg"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                Browse Products
              </Link>
            </div>
            <p
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 13,
                marginTop: 18,
                display: 'flex',
                gap: 16,
              }}
            >
              <span>✓ First 7 days free</span>
              <span>✓ Cancel anytime</span>
              <span>✓ No hidden charges</span>
            </p>
          </div>

          {/* Right: product grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 14,
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  borderRadius: 16,
                  padding: '20px 12px',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: 42 }}>{product.emoji}</div>
                <div
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: 700,
                    marginTop: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 4 }}>
                  ₹{product.price}/{product.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────── */}
      <section
        style={{
          background: 'white',
          borderBottom: '1px solid var(--border)',
          padding: '28px 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            textAlign: 'center',
          }}
        >
          {[
            { value: '5,00,000+', label: 'Happy Families' },
            { value: '20+ Cities', label: 'Pan India Delivery' },
            { value: '100%', label: 'Purity Guaranteed' },
            { value: '4.9 ★', label: 'Average Rating' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div
                style={{ fontSize: 28, fontWeight: 800, color: 'var(--green-700)' }}
              >
                {value}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-dark)' }}>
              How It Works
            </h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 10, fontSize: 16 }}>
              Fresh dairy on your doorstep in three simple steps
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    background: 'var(--green-700)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'white',
                    margin: '0 auto 20px',
                  }}
                >
                  {step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.65 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--green-50)',
          padding: '80px 24px',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800 }}>Why Nitya Satva?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {FEATURES.map(({ emoji, title, description }) => (
              <div
                key={title}
                className="card"
                style={{ padding: 28, textAlign: 'center' }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800 }}>Loved by Families Across India</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {TESTIMONIALS.map(({ name, city, text, rating }) => (
              <div key={name} className="card" style={{ padding: 28 }}>
                <div style={{ color: 'var(--orange-500)', fontSize: 18, marginBottom: 14 }}>
                  {'★'.repeat(rating)}
                </div>
                <p style={{ color: 'var(--text-medium)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                  &ldquo;{text}&rdquo;
                </p>
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
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--green-900) 0%, var(--green-700) 100%)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: 40, fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Start Your Free Trial Today
        </h2>
        <p
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 18,
            marginBottom: 36,
            maxWidth: 480,
            margin: '0 auto 36px',
          }}
        >
          First 7 days absolutely free. No credit card required. Cancel anytime.
        </p>
        <Link href="/subscribe" className="btn btn-orange btn-lg">
          Get Started — It&apos;s Free →
        </Link>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--green-900)',
          color: 'rgba(255,255,255,0.55)',
          padding: '32px 24px',
          textAlign: 'center',
          fontSize: 13,
        }}
      >
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 24 }}>
          <Link href="/admin" style={{ color: 'rgba(255,255,255,0.5)' }}>Admin Portal</Link>
          <Link href="/delivery" style={{ color: 'rgba(255,255,255,0.5)' }}>Delivery Partner</Link>
          <Link href="/home" style={{ color: 'rgba(255,255,255,0.5)' }}>Customer Login</Link>
        </div>
        © 2026 Nitya Satva — Eternally Pure. All rights reserved.
      </footer>
    </div>
  );
}
