import {combineReducers} from 'redux';
import productsReducer from './product';
import categoryReducer from './categorie';
import cartproductsReducer from './cartproduct';
import adminReducer from './admin_connect';

export default combineReducers(
    {
       productsReducer,
       categoryReducer,
       cartproductsReducer,
       adminReducer
   }
)