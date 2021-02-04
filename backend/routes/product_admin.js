const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
var cors = require('cors');
const middlewares = require('../middlewares/middlewares.js')


router.use(cors());

// router.use('/products', middlewares.isAdmin)
router.post('/products', middlewares.isAdmin, function(req,res){
    try {
      
        const token = req.headers.authorization.split(' ')[1]
        
        let decoded = jwt.decode(token);
        console.log(decoded);

        let newProduct = `INSERT INTO products 
        (name, description, price, image, id_admin,id_category) VALUES
        (?, ?, ?,
        ?, ?, ?)`; 

        con.query(newProduct, [req.body.name, req.body.description,req.body.price,req.body.image, decoded.id ,req.body.id_category], function(err, theproduct){
            if(err) throw err;
             con.query(`SELECT * FROM products WHERE id_product = '${theproduct.insertId}'`, function(err, results){
                 res.status(200).json(results)
                 console.log(theproduct);
                 console.log(results);
             })
           
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
                res.status(200).json(prod)
            })
        } catch (error) {
            console.log(error);
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

    router.put('/products/:id_product', middlewares.isAdmin, function (req, res) {

        try {
            const token = req.headers.authorization.split(' ')[1]
            let decoded = jwt.decode(token);
            console.log(decoded);
            let idProducts = req.params.id_product
            console.log(req.body);
            // let updateProduct = `UPDATE products 
            // (name, description, price, image, id_admin,id_category) VALUES
            // (?, ?, ?,
            // ?, ?, ?)`; 

            let updateProduct = `UPDATE products SET name = '${req.body.name}', description = '${req.body.description}', price = '${req.body.price}', image =' ${req.body.image}', id_category = '${req.body.id_category}', id_admin = '${decoded.id}' WHERE id_product = '${idProducts}' `;

        con.query(updateProduct, function(err, resulta){
            if (err) throw err;
            console.log(resulta);
            res.status(200).send(resulta)
        })
        } catch (error) {
            res.status(400);
        }
        
     });

     router.delete('/products/:id_product', middlewares.isAdmin, function(req,res){
         try {
            let idProducts = req.params.id_product

            let deleteProducts = `DELETE FROM products WHERE id_product = '${idProducts}'`
            con.query(deleteProducts, function(err,resultat){
                
                if (err) throw err;
                console.log("Number of records deleted: " + resultat.affectedRows);
                res.status(200).send(resultat)
            })
         } catch (error) {
             res.status(400);
             
         }
       
     })

// router.put('/products', function (req, res) {
//     connection.query('UPDATE `products` SET `name`=?,`description`=?,`category`=?, `price`=?, `image`=? WHERE `id_product`=?', [req.body.name,req.body.description, req.body.category, req.body.price, req.body.image, req.body.id_product], function (error, results, fields) {
//        if (error) throw error;
//        res.end(JSON.stringify(results));
//      });
//  });



 module.exports = router;