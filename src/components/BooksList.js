import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { fetchBooks } from '../BooksSlice';


const BookList = ({ query, category, sorting }) => {
  // книги
  const books = useSelector((state) => state.books.books);
  // состояние загрузки
  const isLoading = useSelector((state) => state.books.isLoading);
  //количество книг
  const totalBooks = useSelector((state) => state.books.totalBooks);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 30;
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setStartIndex((startIndex) => startIndex + maxResults);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          <p>Number of books: {totalBooks}</p>
          {books.map((book) => (

            <Col md={4} key={book.id}>
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
      <Button onClick={handleLoadMore}>More</Button>
    </div>
  );
};

export default BookList;
