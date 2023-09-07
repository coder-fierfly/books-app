import { createSlice } from "@reduxjs/toolkit";
import { searchBooks } from "./Api.js";

const initialState = {
  books: [],
  isLoading: false,
  totalBooks: 0,
};

const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setTotalBooks: (state, action) => {
      state.totalBooks = action.payload;
    },
  },
});

export const { startLoading, finishLoading, setBooks, setTotalBooks } = BooksSlice.actions;

export const fetchBooks = (query, category, sorting, startIndex, maxResults, count) => async (dispatch) => {
  dispatch(startLoading());
  const books = await searchBooks(query, category, sorting, startIndex, maxResults, count);
  dispatch(setBooks(books.items));
  dispatch(setTotalBooks(books.totalItems));
  dispatch(finishLoading());
};

export default BooksSlice.reducer;
