import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import styles from './App.module.css';
import axios from 'axios'; // Add axios for making API calls

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      // Call your Django logout API
      await axios.post('http://localhost:8000/api/logout/');
      // Remove user from localStorage on successful logout
      localStorage.removeItem('user');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            <h1 className={styles.title}>Book Manager</h1>
            <div className={styles.navLinks}>
              {user ? (
                <>
                  <span className={styles.usernmaelog}>Welcome, {user.username}</span>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className={styles.authLink}>Login</a>
                  <a href="/register" className={styles.authLink}>Register</a>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route
              path="/book/new"
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/book/edit/:id"
              element={
                <PrivateRoute>
                  <BookForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
