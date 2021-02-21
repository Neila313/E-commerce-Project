const express = require('express');
const app = express();
const port = 8080;
const con = require('./bdd/db')
const routerAdmin = require('./routes/auth_admin')
const routerCustomer = require('./routes/auth_client')
const routerProduct = require('./routes/product_admin')
const routerArticle = require('./routes/article_admin')
const routerCategory = require('./routes/category_admin')
const routerCart = require('./routes/cart_client')
const routerCartProduct = require('./routes/cartproduct_client')

app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());

app.use('/',routerAdmin)
app.use('/customer',routerCustomer)
app.use('/',routerProduct)
app.use('/',routerArticle)
app.use('/',routerCategory)
app.use('/',routerCart)
app.use('/',routerCartProduct)


app.listen(port, function(){
    console.log('server connected')
	})
	