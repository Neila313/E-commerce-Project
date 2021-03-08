import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import mainReducer from './store/reducer/index';

import { composeWithDevTools } from 'redux-devtools-extension'



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Header from './header/';
import FooterPage from './Footer';
import AdminSignup from './admin_signup';
import Admin from './admin_signin';
import DashboardAdmin from './admin_dashboard';
import AddCategory from './admin_addcategory';
import ListCateg from './admin_category';
import AddProduct from './admin_addproduct';
import ListProduct from './admin_listproduct';
import PutProduct from './admin_putproduct';
// ...........Partie client ......
import ClientSignup from './client_signup';
import ClientSignin from './client_signin';
import DashboardClient from './client_dashboard';
import ProductClient from './client_product';
import OneProductPage from './one_product';
import CartProduct from './cart_product';
import FavorisClient from './favoris_product'
import CommandeClient from './commande_client'
import FilterCateg from './Filter'


import PrivateRoute from './privateroute'

const store = createStore(mainReducer, composeWithDevTools());


const myRouter = (
<Provider store={store}>
		<Router>			
      <Header></Header>
			<Switch>					{/* partie admin  */}
				{/* <Route exact path="/admin" component={allAdmin} /> */}
				<Route exact path="/admin/signup" component={AdminSignup} />
				<Route exact path="/admin" component={Admin} />
				<PrivateRoute exact path="/admin/dashboard/" component={DashboardAdmin} />
				<Route exact path="/admin/product" component={AddProduct}/>
				<Route exact path="/admin/listproduct" component={ListProduct}/>
				<Route exact path="/admin/modifyproduct/:id_product" component={PutProduct}/>
				<Route exact path="/admin/category" component={AddCategory}/>
				<Route exact path="/admin/listcategory" component={ListCateg}/>
									{/* partie client	  */}
				<Route exact path="/home" component={Home} />
				<Route exact path="/catalogue" component={ProductClient} />
				<Route exact path="/product/:id_product" component={OneProductPage} />
				<Route exact path="/inscription" component={ClientSignup} />
				<Route exact path="/connexion" component={ClientSignin} />
				<Route exact path="/mon-compte" component={DashboardClient} />
				<Route exact path="/panier" component={CartProduct} />
				<Route exact path="/wishlist" component={FavorisClient} />
				<Route exact path="/commande" component={CommandeClient} />
				<Route exact path="/filtre" component={FilterCateg} />
			
			</Switch>
			<FooterPage></FooterPage>
		</Router>
  </Provider>
);
ReactDOM.render(myRouter, document.getElementById('root'));





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
