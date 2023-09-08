import React, { useState } from 'react';
import Select from 'react-select';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
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
  const [count, setCount] = useState(0)
  const [sorting, setSorting] = useState('relevance');
  const dispatch = useDispatch();

  //срабатывание поиска по нажатию на кнопку поиск
  const handleSearch = async () => {
    if (query.trim() !== '') {
      dispatch(fetchBooks(query, category, sorting));
    }
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
    <div className='outer-search'>
      <h1 className='h1-title text-center'>Search for books</h1>
      <Container>

        <Row>
          <Col className="col-12 col-md-4">

            <Form className="d-flex align-items-center">
              <Form.Group controlId="formBasicSearch" className="flex-grow-1">
                <Form.Control
                  className="enterForm"
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={handleSearch}
              >
                <i className="fa fa-search"></i>
                <span className="ml-2"></span>
              </Button>
            </Form>

          </Col>
          <Col className="col-12 col-md-4">
            <Select
              className='CategoriesList'
              options={categories}
              value={categories.find((cat) => cat.value === category)}
              onChange={handleCategoryChange}
            />
          </Col>
          <Col className="col-12 col-md-4">
            <Select
              className='SortingList'
              options={sortingOptions}
              value={sorting}
              onChange={handleSortingChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SearchBooks;
