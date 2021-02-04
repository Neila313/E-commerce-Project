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

// const decodedId = (req,res,next)=> {
//     if(!req.headers.authorization) {
//         throw "no token"
//     } else {
//         const test = req.headers.authorization
//         const token = test.split(' ')[1]
//         console.log(test)
//         console.log(token);
        
//         let decoded = jwt.verify(token, 'supersecret');
//         console.log(decoded);
        
//     } next()


// }


module.exports = {isAdmin, checkEmail}