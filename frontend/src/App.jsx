// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import styles from './App.module.css';

// Wrap the entire App with Router
function App() {
  return (
    <Router>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            <h1 className={styles.title}>Book Manager</h1>
          </div>
        </nav>
        <div className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/book/new" element={<BookForm />} />
            <Route path="/book/edit/:id" element={<BookForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;