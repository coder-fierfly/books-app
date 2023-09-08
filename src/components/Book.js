import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const Book = () => {
    const { id } = useParams();
    //получаем книги из массива
    let books = useSelector((state) => state.books.books);
    // берем конкретную книгу
    const book = books.find((book) => book.id === id);

    if (!book) {
        return <div>No book selected.</div>;
    }

    return (
        <div>
            <img src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image'} alt={book.volumeInfo.title} />
            <h2>{book.volumeInfo.title}</h2>
            <p>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}</p>
            <p>Category: {book.volumeInfo.categories ? book.volumeInfo.categories[0] : ''}</p>
            <p>Description: {book.volumeInfo.description || ''}</p>

        </div>
    );
};

export default Book;