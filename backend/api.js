const express = require('express');
const app = express();
const port = 8080;
const con = require('./bdd/db')
// const routerAdmin = require('./routes/auth_admin')
// const routerCustomer = require('./routes/auth_client')
// const routerProduct = require('./routes/product_admin')

app.use(
	express.urlencoded({
		extended: true
	})
);
app.use(express.json());

// app.use('/auth_admin',routerAdmin)
// app.use('/auth_client',routerCustomer)
// app.use('/product',routerProduct)


app.listen(port, function(){
    console.log('server connected')
	})
	