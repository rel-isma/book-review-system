import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/edit-book/:id" element={<BookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;