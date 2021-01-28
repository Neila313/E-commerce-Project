import {combineReducers} from 'redux';
import productsReducer from './product';
import categoryReducer from './category';

export default combineReducers(
    {
       productsReducer,
       categoryReducer
   }
)