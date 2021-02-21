const jwt = require('jsonwebtoken');
const config = require('../routes/config.js').secret;
const con = require('../bdd/db');

const isAdmin = (req,res,next) => {
    let tokenAdmin = req.headers.authorization
    if (tokenAdmin) {
        const token = tokenAdmin.split(' ')[1];

        jwt.verify(token, 'supersecret', (err, decoded) => {
            if(err){
                res.status(203).json({error: "Vous n'êtes pas autorisé à entrer"})
            }  
            else {
                con.query(`SELECT * FROM admin WHERE id_admin = '${decoded.id}'`, function(error, result){
                    if(result.length){
                           next() 
                    } else {
                        res.status(203).json({error: "Vous n'êtes pas autorisé à entrer"})
                    }
                })    
            } 
        })
    } else {
        res.status(400).json({error: "Vous n'avez pas de token"})
    }
};


const checkEmail = (req,res,next) => {
    con.query(`SELECT * FROM admin WHERE email = '${req.body.email}' `, function(err, result){
        if(result.length){
            console.log('email already exist');
            return res.status(400).json({error: "email already exist"})
        } else {
            next()
        }
    })
};

const isCustomer = (req,res,next) => {
    req.user = null 
    let tokenClient = req.headers.authorization
    if (tokenClient) {
        const token = tokenClient.split(' ')[1];
        jwt.verify(token, 'supersecret', (err, decoded) => {
            if(err){
                res.status(401).json({error: "Vous n'êtes pas autorisé à entrer"})
            }  
            else {
                con.query(`SELECT * FROM customer WHERE id_customer = '${decoded.id}'`, function(error, result){
                    if(result.length === 1){
                        req.user = result[0]
                           next() 
                    } else {
                        res.status(401).json({error: "Vous n'êtes pas autorisé à entrer"})
                    }
                })
               
            } 
        })
    } else {
        
        next() 
    }
};


module.exports = {isAdmin, checkEmail, isCustomer}