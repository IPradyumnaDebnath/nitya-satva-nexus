import Navbar from '../components/Navbar';

export default function UserLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
