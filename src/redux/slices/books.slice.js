import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
  favoriteBooks: [],

};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    books: (state, action) => {
      return { ...state, data: action.payload, loading: false };
    },
    addFavoriteBooks: (state, action) => {
      return { ...state, favoriteBooks: [...state.favoriteBooks,action.payload], loading: false };
    },
    removeFavoriteBooks: (state, action) => {
      return { ...state, favoriteBooks: action.payload, loading: false };
    },
    booksError: (state, action) => {
      return { ...state, error: action.payload, loading: false };
    },
    booksReset: (state, action) => {
      state = initialState;
    },
    booksLoading: (state, action) => {
      return { ...state,loading: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { books, booksError, booksLoading,addFavoriteBooks,removeFavoriteBooks } = booksSlice.actions;

export default booksSlice.reducer;
