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
            <h2>{book.volumeInfo.title}</h2>
            <img className="img-class" src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image'} alt={book.volumeInfo.title} />

            <h5>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : ''}</h5>
            <p>Category: {book.volumeInfo.categories ? book.volumeInfo.categories[0] : ''}</p>
            <h6>Description: {book.volumeInfo.description || ''}</h6>

        </div>
    );
};

export default Book;