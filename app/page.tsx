import Link from 'next/link';
import HelloFromBackend from "@/components/HelloFromBackend";

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ 
        maxWidth: 800, 
        margin: '0 auto',
        background: 'white',
        padding: 40,
        borderRadius: 12,
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>Welcome!</h1>
        <p style={{ fontSize: 18, color: '#666', marginBottom: 30 }}>
          Chào mừng bạn đến với ứng dụng của chúng tôi
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          marginBottom: 40,
        }}>
          <Link 
            href="/login"
            style={{
              padding: '12px 24px',
              background: '#1890ff',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Đăng nhập
          </Link>
          <Link 
            href="/signup"
            style={{
              padding: '12px 24px',
              background: '#52c41a',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Đăng ký
          </Link>
          <Link 
            href="/dashboard"
            style={{
              padding: '12px 24px',
              background: '#722ed1',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Dashboard
          </Link>
          <Link 
            href="/admin"
            style={{
              padding: '12px 24px',
              background: '#fa541c',
              color: 'white',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Admin
          </Link>
        </div>
        
        <div style={{ 
          marginTop: 30, 
          padding: 20, 
          border: '1px solid #ddd', 
          borderRadius: 8,
          background: '#f9f9f9',
        }}>
          <HelloFromBackend />
        </div>
      </div>
    </main>
  );
}
