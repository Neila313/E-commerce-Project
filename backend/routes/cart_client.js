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

    router.post('/cart', middlewares.isCustomer, function(req,res){

        try {
            if (req.user === null) {
                throw new Error ("Vous n'êtes pas autorisé à entrer, testest")
            }
            let newCart = `INSERT INTO cart 
            (ordered,id_customer) VALUES
            (?, ?)`; 
    
            con.query(newCart, [true,req.user.id_customer], function(err, thecart){
                if(err) throw err;
                 con.query(`SELECT * FROM cart WHERE id_cart = '${thecart.insertId}'`, function(err, results){
                     res.status(200).json(results)
                     console.log(thecart);
                     console.log(results);
                 })     
            })
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    });


    router.get('/cart', function(req,res){
        try {
            con.query(`SELECT * FROM cart`, function(err,cart){
                if(err) throw err;
                console.log(cart)
                res.status(200).json(cart)
            })
        } catch (error) {
            console.log(error);
            res.status(400).send(error);  
        }
    });

    })











module.exports = router;