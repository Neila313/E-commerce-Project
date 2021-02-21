const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/')

router.use(cors());

con.connect(function(err){

    if(err) throw err;

    router.post('/cartproduct', middlewares.isCustomer, function(req,res){

        try {
            // const token = req.headers.authorization.split(' ')[1]
            // let decoded = jwt.decode(token);
            // console.log(decoded);
            if (req.user === null) {
                throw new Error ("Vous n'êtes pas autorisé à entrer, testest")
            }
            con.query(`SELECT id_cart FROM cart WHERE id_customer = ? AND ordered = ?`, [req.user.id_customer, 0], function(err, results){
                
                if(results.length === 0) {
                   con.query(`INSERT INTO cart (ordered, id_customer) VALUES (?, ?)`, [0, req.user.id_customer], function(error, resulta){
                    let newCartProd = `INSERT INTO cartproduct 
                    (quantity,id_cart,id_product) VALUES
                    (?, ?,?)`; 
    
                    con.query(newCartProd, [req.body.quantity,resulta.insertId, req.body.id_product], function(err, thecartprod){
                        if(err) throw err;
                        res.status(200).json(thecartprod)
                        console.log(thecartprod);
                        console.log(results);    
                    })
                   })
                  console.log(results);

                } else {
                    results = results[0].id_cart
                    let newCartProd = `INSERT INTO cartproduct 
                    (quantity,id_cart,id_product) VALUES
                    (?, ?,?)`; 
    
                    con.query(newCartProd, [req.body.quantity,results, req.body.id_product], function(err, thecartprod){
                        if(err) throw err;
                        res.status(200).json(thecartprod)
                        console.log(thecartprod);
                        console.log(results);    
                    })
                }
            })

        } catch (error) {
            res.status(401).json({error: error.message})

        }
    });


    // router.get('/cartproduct', function(req,res){
    //     try {
    //         con.query(`SELECT * FROM cartproduct`, function(err,cartprod){
    //             if(err) throw err;
    //             console.log(cartprod)
    //             res.status(200).json(cartprod)
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).send(error);  
    //     }
    // });
    

  
    router.get('/cartproduct/', middlewares.isCustomer, function(req,res){
        console.log(req.user);
        
        try {
            if (req.user === null) {
                throw new Error ("Vous n'êtes pas autorisé à entrer, testest")
            }
            con.query(`SELECT id_cart FROM cart WHERE id_customer = ? AND ordered = ?`, [req.user.id_customer, 0], async function(err, results){
                console.log(results);
                console.log('//////////');
                
                if (results.length === 0) {
                    res.send([])
                } else {

                    con.query(`SELECT * FROM cartproduct WHERE id_cart = ?`, [results[0].id_cart], function(err,cartprod){
                        if(err) throw err;
                        console.log(cartprod)
                        res.status(200).json(cartprod)
                    })

                }
            })
          

            
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    });

    })


module.exports = router;