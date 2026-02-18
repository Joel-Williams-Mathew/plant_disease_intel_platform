import React from 'react';
import { auth, googleProvider } from '../../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container" style={{
      height: '100vh', width: '100vw', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)'
    }}>
      <div className="coming-soon-card" style={{ maxWidth: '500px', padding: '60px' }}>
        <div className="sidebar-brand-icon">🌱</div>
        <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-md)' }}>
          AgriIntel
        </h1>
        
        {/* Quote Section */}
        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
          "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings."
          <br />— <span style={{ color: 'var(--text-accent)' }}>Masanobu Fukuoka</span>
        </p>

        <button className="btn btn-primary" onClick={handleLogin} style={{ width: '100%', gap: '12px' }}>
          <LogIn size={20} /> Sign in with Google
        </button>
        
        <div className="coming-soon-badge" style={{ marginTop: 'var(--space-lg)' }}>
          Secure Multi-Agent Access
        </div>
      </div>
    </div>
  );
};

export default LoginPage;