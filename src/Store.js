import { configureStore } from "@reduxjs/toolkit";
import BooksReducer from "./BooksSlice";

const Store = configureStore({
  reducer: {
    books: BooksReducer,
  },
});

export default Store;
