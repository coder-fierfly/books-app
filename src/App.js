import React from 'react';
import SearchBooks from './components/SearchBooks';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BooksList';
import Book from './components/Book';
/*
При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, все категории, все авторы, описание.
*/
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
