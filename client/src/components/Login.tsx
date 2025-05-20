import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || 'Login successful!');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="identifier" placeholder="Mobile No. or Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}
      </form>
      <div className="link">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <div className="link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}