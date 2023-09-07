import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { fetchBooks } from '../BooksSlice';
import { useNavigate } from "react-router-dom";


const BookList = () => {
  // книги
  const books = useSelector((state) => state.books.books);
  // состояние загрузки
  const isLoading = useSelector((state) => state.books.isLoading);
  //количество книг
  const totalBooks = useSelector((state) => state.books.totalBooks);
  //категория
  const category = useSelector((state) => state.books.category);
  //вид сортировки
  const sorting = useSelector((state) => state.books.sorting);
  // запрос
  const query = useSelector((state) => state.books.query);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 30;
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();

  const handleLoadMore = () => {
    if (startIndex < totalBooks) {
      dispatch(fetchBooks(query, category, sorting, startIndex, maxResults))
    }
    setStartIndex((startIndex) => startIndex + maxResults);
  };

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {(totalBooks > 0) ? <p>Number of books: {totalBooks}</p> : <p>Enter a request</p>}
          {books.map((book) => (

            <Col md={5} key={book.id} onClick={() => handleBookClick(book.id)}>
              <Card style={{ marginBottom: '10px' }}>
                <Card.Img
                  variant="top"
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : 'https://via.placeholder.com/128x192.png?text=No+Image'
                  }
                  alt={book.volumeInfo.title}
                />
                <Card.Body>
                  <Card.Title>{book.volumeInfo.title || ''}</Card.Title>
                  <Card.Text>
                    Category: {book.volumeInfo.categories ? book.volumeInfo.categories[0] : ''}
                  </Card.Text>
                  <Card.Text>
                    Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          ))}
        </ul>

      )}
      {(totalBooks > startIndex) ? <Button onClick={handleLoadMore}>More</Button> : ''}
      {/* <Button onClick={handleLoadMore}>More</Button> */}
    </div>
  );
};

export default BookList;
