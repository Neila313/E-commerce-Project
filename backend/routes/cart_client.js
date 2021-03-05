const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/')


router.use(cors());

    router.post('/cart', middlewares.isCustomer, async function(req,res){

        try {
            if (req.user === null) {
                throw new Error ("Vous n'êtes pas autorisé à entrer, testest")
            }
            let newCart = `INSERT INTO cart 
            (ordered,id_customer) VALUES
            (?, ?)`; 
    
            const [thecart] = await con.query(newCart, [1,req.user.id_customer]);
            const [results] = await con.query(`SELECT * FROM cart WHERE id_cart = '${thecart.insertId}'`);
            res.status(200).json(results)
            console.log(thecart);
            console.log(results);
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    });


    router.get('/cart', async function(req,res){
        try {
            const [cart] = await con.query(`SELECT * FROM cart`);
            res.status(200).json(cart)
        } catch (error) {
            console.log(error);
            res.status(400).send(error);  
        }
    });

module.exports = router;