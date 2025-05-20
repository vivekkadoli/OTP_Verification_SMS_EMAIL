import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const history = useHistory();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
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
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || 'Registration successful!');
        setTimeout(() => history.push('/login'), 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="phoneNumber" placeholder="Mobile No." onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}
      </form>
      <div className="link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}