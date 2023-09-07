import { createSlice } from "@reduxjs/toolkit";
import { searchBooks } from "./Api.js";

const initialState = {
  books: [],
  isLoading: false,
  totalBooks: 0,
  query: '',
  category: 'all',
  sorting: 'relevance',
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
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    }
  },
});

export const { startLoading, finishLoading, setBooks, setTotalBooks, setQuery, setCategory } = BooksSlice.actions;

export const fetchBooks = (query, category, sorting, startIndex, maxResults) => async (dispatch) => {
  dispatch(startLoading());
  const books = await searchBooks(query, category, sorting, startIndex, maxResults);
  dispatch(setBooks(books.items));
  dispatch(setTotalBooks(books.totalItems));
  dispatch(setQuery(query));
  dispatch(setCategory(category))
  dispatch(finishLoading());
};

export default BooksSlice.reducer;
