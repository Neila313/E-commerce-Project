import {combineReducers} from 'redux';
import productsReducer from './product';
import categoryReducer from './categorie';

export default combineReducers(
    {
       productsReducer,
       categoryReducer
   }
)