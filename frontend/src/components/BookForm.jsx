import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="publication_date">Publication Date:</label>
          <input
            type="date"
            id="publication_date"
            name="publication_date"
            value={book.publication_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default BookForm;