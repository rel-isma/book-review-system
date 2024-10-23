import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BookDetail.module.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/books/${id}/`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };
    fetchBookDetails();
  }, [id]);


  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/books/${id}/`);
        navigate('/'); 
      } catch (error) {
        console.error('Error deleting the book:', error);
      }
    }
  };

  if (!book) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{book.title}</h2>
      <div className={styles.grid}>
        <div className={styles.field}>
          <div className={styles.label}>Author</div>
          <div className={styles.value}>{book.author}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>Publication Date</div>
          <div className={styles.value}>{book.publication_date}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.label}>ISBN</div>
          <div className={styles.value}>{book.isbn}</div>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button 
          onClick={() => navigate(`/book/edit/${id}`)}
          className={styles.primaryButton}
        >
          Edit Book
        </button>
        <button 
          onClick={() => navigate('/')}
          className={styles.secondaryButton}
        >
          Back to List
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteButton}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};
export default BookDetail;
