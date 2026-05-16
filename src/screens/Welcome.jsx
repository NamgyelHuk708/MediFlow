import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Welcome.css';

function MediFlowLogo() {
  return (
    <div className="brand-logo-block">
      <div className="brand-monogram">MF</div>
      <div className="brand-text-group">
        <span className="brand-name">MediFlow</span>
        <span className="brand-dzongkha">འབྲུག་གཅེས་རོགས་ཨེ་ཨའི།</span>
      </div>
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <button className="auth-back-btn" onClick={onClick}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Back
    </button>
  );
}

export default function Welcome() {
  const navigate = useNavigate();
  const { registerUser, loginUser } = useApp();
  const [view, setView] = useState('landing'); // 'landing' | 'login' | 'register'

  // Register fields
  const [regName, setRegName] = useState('');
  const [regCID, setRegCID]   = useState('');
  const [regError, setRegError] = useState('');

  // Login fields
  const [loginCID, setLoginCID]     = useState('');
  const [loginError, setLoginError] = useState('');

  function handleRegister() {
    const name = regName.trim();
    const cid  = regCID.trim();
    if (!name) { setRegError('Please enter your full name.'); return; }
    if (!/^\d{11}$/.test(cid)) { setRegError('CID number must be exactly 11 digits.'); return; }
    setRegError('');
    registerUser(name, cid);
    navigate('/dashboard');
  }

  function handleLogin() {
    const cid = loginCID.trim();
    if (!/^\d{11}$/.test(cid)) { setLoginError('Please enter a valid 11-digit CID number.'); return; }
    setLoginError('');
    const result = loginUser(cid);
    if (result.ok) {
      navigate('/dashboard');
    } else {
      setLoginError(result.error);
    }
  }

  return (
    <div className="welcome-container">
      <div className="bg-triangle bg-triangle-1" />
      <div className="bg-triangle bg-triangle-2" />

      <div className="language-switcher">
        <span className="lang-label">English</span>
        <span className="lang-divider">|</span>
        <span className="lang-label dzongkha">རྫོང་ཁ།</span>
      </div>

      {/* ── LANDING ── */}
      {view === 'landing' && (
        <div className="welcome-content">
          <div className="logo-section">
            <div className="logo-card">
              <MediFlowLogo />
            </div>
          </div>

          <div className="welcome-text">
            <h1 className="main-title">MediFlow</h1>
            <p className="tagline">Your Health Companion for Every Bhutanese</p>
            <p className="dzongkha-text">
              འབྲུག་གཅེས་རོགས་ཨེ་ཨའི།<br />
              འབྲུག་མི་ཡོངས་ཀྱི་འཕྲོད་བསྟེན་རོགས་རམ།
            </p>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={() => setView('login')}>
              Login &nbsp;→
            </button>
            <button className="btn btn-secondary" onClick={() => setView('register')}>
              Create Account
            </button>
            <div className="trust-footer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.5}}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="trust-text">Secured Health Intelligence</span>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER ── */}
      {view === 'register' && (
        <div className="welcome-content">
          <div className="auth-card">
            <BackButton onClick={() => { setView('landing'); setRegError(''); setRegName(''); setRegCID(''); }} />

            <div className="auth-card-header">
              <MediFlowLogo />
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-subtitle">Register with your Bhutan CID to get started</p>
            </div>

            <div className="auth-fields">
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="e.g. Karma Wangdi"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                />
              </div>

              <div className="field-group">
                <label className="field-label">CID Number</label>
                <input
                  className="auth-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="11-digit CID number"
                  value={regCID}
                  onChange={e => setRegCID(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                />
                <span className="field-hint">Your Citizenship Identity Document number</span>
              </div>

              {regError && <p className="auth-error">{regError}</p>}

              <button className="btn btn-primary" onClick={handleRegister}>
                Register &nbsp;→
              </button>
            </div>

            <p className="auth-switch">
              Already have an account?{' '}
              <button className="auth-switch-btn" onClick={() => { setView('login'); setRegError(''); }}>
                Login here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ── LOGIN ── */}
      {view === 'login' && (
        <div className="welcome-content">
          <div className="auth-card">
            <BackButton onClick={() => { setView('landing'); setLoginError(''); setLoginCID(''); }} />

            <div className="auth-card-header">
              <MediFlowLogo />
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Enter your CID number to continue</p>
            </div>

            <div className="auth-fields">
              <div className="field-group">
                <label className="field-label">CID Number</label>
                <input
                  className="auth-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="11-digit CID number"
                  value={loginCID}
                  onChange={e => setLoginCID(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>

              {loginError && <p className="auth-error">{loginError}</p>}

              <button className="btn btn-primary" onClick={handleLogin}>
                Login &nbsp;→
              </button>
            </div>

            <p className="auth-switch">
              Don't have an account?{' '}
              <button className="auth-switch-btn" onClick={() => { setView('register'); setLoginError(''); }}>
                Register here
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
