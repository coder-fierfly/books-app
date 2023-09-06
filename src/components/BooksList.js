import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


const BookList = () => {
  // книги
  const books = useSelector((state) => state.books.books);
  // состояние загрузки
  const isLoading = useSelector((state) => state.books.isLoading);

  return (
    <div>
      {isLoading ? (
        <p>Идет загрузка...</p>
      ) : (
        <ul>
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
    </div>
  );
};

export default BookList;
