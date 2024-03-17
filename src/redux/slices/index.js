import {combineReducers} from 'redux';
import booksReducer from './books.slice'
export const rootReducer = combineReducers({
  books: booksReducer
});
