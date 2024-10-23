import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BookList.module.css';

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
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Book List</h2>
        <Link to="/book/new" className={styles.addButton}>
          Add New Book
        </Link>
      </div>
      <div className={styles.grid}>
        {books.map(book => (
          <Link key={book.id} to={`/book/${book.id}`} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{book.title}</h3>
              <p className={styles.cardAuthor}>{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookList;