import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

/*
Фильтрация по категориям. Ниже текстового поля располагается селект с категориями: all, art, biography, computers, history, medical, poetry. Если выбрано "all" (выбрано изначально), то поиск производится по всем категориям.

Сортировка. Рядом с селектом категорий находится селект с вариантами сортировки: relevance (выбран изначально), newest.

Найденные книги отображаются карточками, каждая из которых состоит из изображения обложки книги, названия книги, названия категории и имен авторов. Если для книги приходит несколько категорий, то отображается только первая. Авторы отображаются все. Если не приходит какой-либо части данных, то вместо нее просто пустое место.

Над блоком с карточками отображается количество найденных по запросу книг.

Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к уже загруженным книгам подгружаются еще. Шаг пагинации - 30.

При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, все категории, все авторы, описание.
*/ 

const apiKey = 'AIzaSyC4aPXGSOiRebdvLuHjYe_SAUhzwt50t2E';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    console.log('hendle');
    console.log(query);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('press');
      console.log(query);
      handleSearch();
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Search for books</h1>
          <Form>
            <Form.Group controlId="formBasicSearch">
              <Form.Control
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
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
                <Card.Title>{book.volumeInfo.title}</Card.Title>
                <Card.Text>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
