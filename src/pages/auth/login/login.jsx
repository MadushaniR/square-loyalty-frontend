import { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = res.data.token;

      if (token) {
        localStorage.setItem('token', token);
      }

      setMessage(res.data.message || 'Login successful');
      navigate('/app/dashboard');
      console.log('Login successful:', res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      console.error('Login failed:', err.response?.data || err.message);
    }
  };

  return (
    <AuthLayout title="Login" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </AuthLayout>
  );
};

export default Login;
