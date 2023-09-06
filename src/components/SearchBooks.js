import React, { useState } from 'react';
import Select from 'react-select';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { fetchBooks } from "../BooksSlice";
import { useDispatch } from "react-redux";

const categories = [
  { value: 'all', label: 'All' },
  { value: 'art', label: 'Art' },
  { value: 'biography', label: 'Biography' },
  { value: 'computers', label: 'Computers' },
  { value: 'history', label: 'History' },
  { value: 'medical', label: 'Medical' },
  { value: 'poetry', label: 'Poetry' },
];
const sortingOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest' },
];

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [sorting, setSorting] = useState('relevance');
  const dispatch = useDispatch();

  //срабатывание поиска по нажатию на кнопку поиск
  const handleSearch = async () => {
    dispatch(fetchBooks(query, category, sorting));

  };

  //срабатывание поиска по нажатию на enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  //смена категорий
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory.value);
  };

  //сортировка
  const handleSortingChange = (selectedSorting) => {
    setSorting(selectedSorting);
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
        <Select
          options={categories}
          value={categories.find((cat) => cat.value === category)}
          onChange={handleCategoryChange}
        />
        <Select
          options={sortingOptions}
          value={sorting}
          onChange={handleSortingChange}
        />
      </Row>
    </Container>
  );
}

export default SearchBooks;
