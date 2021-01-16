const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');

router.post('/products', function(req,res){
    try {
        if(!req.headers.authorization) {
            throw "no token"
        }
        const test = req.headers.authorization
        const token = test.split(' ')[1]
        console.log(token);
        
        let decoded = jwt.verify(token, 'supersecret');
        console.log('wesh');
        console.log(decoded);

        // if(!decoded.id){
        //     throw "invalid token"
        // }
        console.log(req.body);

        let newProduct = `INSERT INTO products 
        (name, description, category, price, image, id_admin) VALUES
        ('${req.body.name}', '${req.body.description}','${req.body.category}',
        '${req.body.price}', '${req.body.image}', '${decoded.id}')`; 

        con.query(newProduct, function(err, theproduct){
            if(err) throw err;
             con.query(`SELECT * FROM products WHERE id_product = '${theproduct.insertId}'`, function(err, results){
                 res.status(200).send("Product added successfully")
             })
            console.log(theproduct);
        })
    } catch (error) {
        res.send(error)
    }
});

    router.get('/products', function(req,res){

        try {
            con.query(`SELECT * FROM products`, function(err,prod){
                if(err) throw err;
                console.log(prod)
                res.status(200).send(prod)
            })
        } catch (error) {
            res.status(400).send(error);  
        }
    });

    router.get('/products/:id_product', function(req,res){
        try {
            let idProducts = req.params.id_product
            console.log(idProducts)
    
                con.query(`SELECT * FROM products WHERE id_product = ${idProducts}`, function(err, result){
                    
                    if (err) throw err;
				console.log(result);
                res.status(200).send(result);    
                })
        
            } catch (error) {
		
			res.status(400);
		}
    })

    router.put('/products/:id_product', function (req, res) {

        try {

            let idProducts = req.params.id_product

            let updateProduct = `UPDATE products SET name = '${req.body.name}', description = '${req.body.description}', category = '${req.body.category}', price = '${req.body.price}', image =' ${req.body.image}' WHERE id_product = '${idProducts}' `;

        con.query(updateProduct, function(err, resulta){
            if (err) throw err;
            console.log(resulta);
            res.status(200).send(resulta)
        })
            
        } catch (error) {
            res.status(400);

        }

        
     });

// router.put('/products', function (req, res) {
//     connection.query('UPDATE `products` SET `name`=?,`description`=?,`category`=?, `price`=?, `image`=? WHERE `id_product`=?', [req.body.name,req.body.description, req.body.category, req.body.price, req.body.image, req.body.id_product], function (error, results, fields) {
//        if (error) throw error;
//        res.end(JSON.stringify(results));
//      });
//  });



 module.exports = router;