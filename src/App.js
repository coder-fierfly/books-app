import React from 'react';
import SearchBooks from './components/SearchBooks';
import BookList from './components/BooksList';
/*
При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, все категории, все авторы, описание.
*/
function App() {
  return (
    <div>
      <SearchBooks />
      <BookList />
    </div>
  );
}

export default App;
