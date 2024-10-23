import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BookForm.module.css';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    publication_date: '',
    isbn: '',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/books/${id}/`);
          setBook(response.data);
        } catch (error) {
          console.error('Error fetching book details:', error);
        }
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/books/${id}/`, book);
      } else {
        await axios.post('http://localhost:8000/api/books/', book);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {id ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Author</label>
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Publication Date</label>
          <input
            type="date"
            name="publication_date"
            value={book.publication_date}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>ISBN</label>
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button 
            type="submit"
            className={styles.primaryButton}
          >
            {id ? 'Update' : 'Create'}
          </button>
          <button 
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;