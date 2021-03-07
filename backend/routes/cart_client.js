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
            const [cartline] = await con.query(`SELECT * FROM cart_line WHERE id_customer = ?`, [req.user.id_customer])
            if (cartline.length < 1) {
                throw new Error("Votre panier est vide");
            }
            let newCart = `INSERT INTO commande 
            (date_commande,status,id_customer) VALUES
            (?, ?,?)`; 
    
            const [thecart] = await con.query(newCart, [new Date(),1,req.user.id_customer]);
            await con.query(`INSERT INTO commande_line 
            SELECT ?, id_product, qty, date_added 
            FROM cart_line WHERE id_customer = ?`,[
                thecart.insertId, 
                req.user.id_customer
            ]);

            await con.query(`DELETE FROM cart_line 
            WHERE id_customer = ? `, [
                req.user.id_customer
            ]);
            res.status(200).json({message : "Votre commande a été validée"})
        } catch (error) {
            res.status(401).json({error: error.message})
        }
    });


    router.get('/cart', async function(req,res){
        try {
            const [cart] = await con.query(`SELECT * FROM commande`);
            res.status(200).json(cart)
        } catch (error) {
            res.status(400).send(error);  
        }
    });

module.exports = router;