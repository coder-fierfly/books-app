import React from 'react';
import SearchBooks from './components/SearchBooks';
import BookList from './components/BooksList';
/*
Над блоком с карточками отображается количество найденных по запросу книг.

Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к уже загруженным книгам подгружаются еще. Шаг пагинации - 30.

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
