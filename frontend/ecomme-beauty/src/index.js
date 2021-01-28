import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import mainReducer from './store/reducer';

import { composeWithDevTools } from 'redux-devtools-extension'



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Header from './header/';
import AdminSignup from './admin_signup';
import AdminSignin from './admin_signin';
import allAdmin from './admin_all';
import ProductClient from './client_product';
import AddProduct from './admin_addproduct';
import ListProduct from './admin_listproduct';
import PutProduct from './admin_putproduct';
import ClientSignup from './client_signup';
import ClientSignin from './client_signin';
import DashboardAdmin from './admin_dashboard';
import PrivateRoute from './privateroute'

const store = createStore(mainReducer, composeWithDevTools());

const myRouter = (
<Provider store={store}>
		<Router>
      <Header></Header>
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/catalogue" component={ProductClient} />
				<Route path="/inscription" component={ClientSignup} />
				<Route path="/connexion" component={ClientSignin} />
				<Route exact path="/admin" component={allAdmin} />
				<Route exact path="/admin/signup" component={AdminSignup} />
				<Route exact path="/admin/signin" component={AdminSignin} />
				<PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} />
				<Route exact path="/admin/product" component={AddProduct}/>
				<Route exact path="/admin/listproduct" component={ListProduct}/>
				<Route exact path="/admin/modifyproduct/:id_product" component={PutProduct}/>
			</Switch>
		</Router>
  </Provider>
);
ReactDOM.render(myRouter, document.getElementById('root'));





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
