const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');

router.use(cors());

con.connect(function(err){

    if(err) throw err;

    router.post('/sign-up', function(req,res){

        bcrypt.hash(req.body.password, saltRounds, function(err,hash){

            try {
                let dataCustomer = `INSERT INTO customer (lastname, firstname, email, password) VALUES
                ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${hash}')`;
    
                con.query(dataCustomer, (err,result) => {
                    if(err) throw err;
                    console.log(result)
                    res.status(200).send('New User added');
                })
            } catch (error) {
                res.send(error)
            }
        })
    });

    router.post('/sign-in', function(req,res){
        try {

            con.query(`SELECT * FROM customer WHERE email = '${req.body.email}'`,function(err, result){
                
                if(result.length == 0) {
                    console.log(result)
                    res.status(203).send("Adresse email inconnue")

                } else {
                    console.log(req.body)
                    bcrypt.compare(req.body.password, result[0].password, function(err,resulta){
                        if(resulta) {
                            let token = jwt.sign({id : result[0].id_customer, email : result[0].email}, config.secret, {expiresIn: 86400});
                            console.log(token)
                            res.status(200).send({ token: token });
                        } else {
                            res.status(203).send("Mots de passe incorrect")
                        }
                     }) 
                }
            })
            
        } catch (error) {
            res.status(400).send(error);  
        }
    });

    router.get('/customer', function(req,res){

        try {
            con.query(`SELECT id_customer, lastname, firstname  FROM customer`, function(err,result){
                if(err) throw err;
                console.log(result[0])
                res.status(200).send(result[0])
            })
        } catch (error) {
            res.status(400).send(error);  
        }
    })

    })



module.exports = router;