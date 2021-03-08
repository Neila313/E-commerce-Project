import {combineReducers} from 'redux';
import productsReducer from './product';
import categoryReducer from './categorie';
import cartproductsReducer from './cartproduct';
import adminReducer from './admin_connect';
import clientReducer from './client_connect';
import favorisReducer from './favoris'
import commandeReducer from './commande_client'

export default combineReducers(
    {
       productsReducer,
       categoryReducer,
       cartproductsReducer,
       adminReducer,
       favorisReducer,
       commandeReducer,
       clientReducer
   }
)