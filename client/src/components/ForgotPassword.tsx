import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/otp/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('OTP sent to your registered email/mobile.');
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch {
      setError('Network error');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/otp/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, otp, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('Password reset successful! You can now login.');
        setStep(3);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {step === 1 && (
        <form onSubmit={handleRequestOTP} autoComplete="off">
          <input
            placeholder="Mobile No. or Email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
          <button type="submit">Generate OTP</button>
          {msg && <div className="success">{msg}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleResetPassword} autoComplete="off">
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {msg && <div className="success">{msg}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      )}
      {step === 3 && (
        <div className="success">
          Password reset successful! <Link to="/login">Login</Link>
        </div>
      )}
      <div className="link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
}