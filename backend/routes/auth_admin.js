const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/middlewares.js')

router.use(cors());

con.connect(function(err){

    if(err) throw err;

    // Route permettant à l'administrateur de se créer un compte 
    // Nous avons hasher le mots de passe pour sécurisé le compte et chaque admin aura un token "jeton" permettra à l'admin de se connecter pour sécuriser le compte 
    router.use('/sign-up', middlewares.checkEmail)
    router.post('/sign-up', function(req,res){
        bcrypt.hash(req.body.password, saltRounds, function(err,hash){
            try {
                let dataAdmin = `INSERT INTO admin (lastname, firstname, email, password) VALUES
                ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${hash}')`;
    
                con.query(dataAdmin, (err,result) => {
                    if(err) throw err;
                    res.status(200).send('New Admin added');
                })
                
            } catch (error) {
                res.send(error)
            }
        })

        })

        // Route permettant à l'admin de se connecter, ici nous comparons l'email entré par rapport à celui présent dans la bdd ainsi que le mots de passe. Nous vérifions également que l'admin a un jeton si non l'accès lui sera refusé. 

        router.post('/sign-in', function(req,res){
            try {
    
                con.query(`SELECT * FROM admin WHERE email = '${req.body.email}'`,function(err, result){
                    
                    if(result.length == 0) {
                        console.log(result.length)
                        res.status(203).send("Adresse email inconnue")
    
                    } else {
                        console.log(req.body)
    
                        bcrypt.compare(req.body.password, result[0].password, function(err,resulta){
                            if(resulta) {
                                
                                let token = jwt.sign({id : result[0].id_admin, 
                                    email: result[0].email, admin: true}, config.secret, {expiresIn: 86400});
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

        // route permettant de récupérer l'admin , par son id nous pourrons accéder à son nom et prénom. Je souhaite utiliser cela afin de personnaliser son dashboard.
        
        router.get('/admin', function(req,res){

            try {
                
                con.query(`SELECT id_admin, lastname, firstname  FROM admin`, function(err,result){
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