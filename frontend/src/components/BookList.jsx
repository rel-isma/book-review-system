import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:8000/api/books/');
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <Link to="/add-book">Add New Book</Link>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;