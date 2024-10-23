// src/components/Auth/Login.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';


const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', credentials);
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          className={styles.authInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className={styles.authInput}
        />
        <button type="submit" className={styles.authButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;