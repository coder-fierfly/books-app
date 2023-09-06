import { createSlice } from "@reduxjs/toolkit";
import { searchBooks } from "./Api.js";

const initialState = {
  books: [],
  isLoading: false,
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
  },
});

export const { startLoading, finishLoading, setBooks } = BooksSlice.actions;

export const fetchBooks = (query, category, sorting) => async (dispatch) => {
  dispatch(startLoading());
  const books = await searchBooks(query, category, sorting);
  dispatch(setBooks(books));
  dispatch(finishLoading());
};

export default BooksSlice.reducer;
