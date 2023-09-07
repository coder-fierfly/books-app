import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const Book = () => {
    const selectedBook = useSelector((state) => state.books.selectedBook);
    const { id } = useParams();
    const [book, setBook] = useState(null);
    let books = useSelector((state) => state.books);

    // useEffect(() => {

    // }, [id]);

    if (!selectedBook) {
        console.log(books);
        return <div>No book selected.</div>;
    }

    return (
        <div>
            <h2>{selectedBook.volumeInfo.title}</h2>
            <p>Authors: {selectedBook.volumeInfo.authors ? selectedBook.volumeInfo.authors.join(', ') : ''}</p>
            <p>Category: {selectedBook.volumeInfo.categories ? selectedBook.volumeInfo.categories[0] : ''}</p>
            <p>Description: {selectedBook.volumeInfo.description || ''}</p>
            <img src={selectedBook.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image'} alt={selectedBook.volumeInfo.title} />
        </div>
    );
};

export default Book;