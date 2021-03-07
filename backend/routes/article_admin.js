const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');

router.post('/articles', function(req,res){
    try {
        if(!req.headers.authorization) {
            throw "no token"
        }
        const test = req.headers.authorization
        const token = test.split(' ')[1]
        
        let decodedArticle = jwt.verify(token, 'supersecret');
        // console.log('wesh');

        // if(!decoded.id){
        //     throw "invalid token"
        // }
        
        let lol = req.body.paragraphe
        lol = lol.replace(/'/g, ' ')
        lol = lol.replace(/`/g, ' ')
        

        let newArticle = `INSERT INTO articles 
        (title, paragraphe, image, published_on, id_admin) VALUES
        ('${req.body.title}', '${lol}','${req.body.image}',
        '${req.body.published_on}', '${decodedArticle.id}')`; 

        con.query(newArticle, function(err, thearticle){
            if(err) throw err;
            
             con.query(`SELECT * FROM articles WHERE id = '${thearticle.insertId}'`, function(err, results){

                 res.status(200).send("Article added successfully")
             })
        })
    } catch (error) {
        res.send(error)
    }
 });

 router.get('/articles', function(req,res){

    try {
        con.query(`SELECT * FROM articles`, function(err,arti){
            if(err) throw err;
            res.status(200).send(arti)
        })
    } catch (error) {
        res.status(400).send(error);  
    }
 });

 router.get('/articles/:id_article', function(req,res){
    try {
        let idArticles = req.params.id_article
        console.log(idArticles)

            con.query(`SELECT * FROM articles WHERE id_article = ${idArticles}`, function(err, result){
                
                if (err) throw err;
            console.log(result);
            res.status(200).send(result);    
            })
    
        } catch (error) {
    
        res.status(400);
    }
});



 module.exports = router;