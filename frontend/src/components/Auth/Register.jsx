// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', userData);
      navigate('/login');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({...userData, username: e.target.value})}
          className={styles.authInput}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          className={styles.authInput}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          className={styles.authInput}
        />
        <button type="submit" className={styles.authButton}>Register</button>
      </form>
    </div>
  );
};

export default Register;