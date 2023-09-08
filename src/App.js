import React from 'react';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BooksList';
import Book from './components/Book';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Book />} /> {/* Добавляем маршрут для детальной страницы книги */}

        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (<><SearchBooks /> <BookList /></>);
}

export default App;
