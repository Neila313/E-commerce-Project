const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
var cors = require('cors');
 const middlewares = require('../middlewares/')

router.use(cors());



router.post('/category',middlewares.isAdmin, function(req, res){

    try {
        const token = req.headers.authorization.split(' ')[1]
        
        let decoded = jwt.decode(token);
        console.log(decoded);

        let newCategory = `INSERT INTO category 
        (denomination) VALUES
        (?)`; 

        con.query(newCategory, [req.body.denomination], function(err, thecategory){
            if(err) throw err;
             con.query(`SELECT * FROM category WHERE id_category = '${thecategory.insertId}'`, function(err, results){
                 res.status(200).json(results)
                 console.log(thecategory);
                 console.log(results);
             })
           
        })

    } catch (error) {

        res.status(400).send(error);     
    }
})

router.get('/category', function(req,res){

    try {
        
        con.query(`SELECT * FROM category`, function(err,categ){
            if(err) throw err;
            console.log(categ)
            res.status(200).json(categ)
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);  
    }
});
router.get('/category/:id_category', function(req,res){
    try {
        let idCategori = req.params.id_category
        console.log(idCategori)

            con.query(`SELECT * FROM category WHERE id_category = ${idCategori}`, function(err, result){
                
                if (err) throw err;
            console.log(result);
            res.status(200).send(result);    
            })
    
        } catch (error) {
    
        res.status(400);
    }
})

router.put('/category/:id_category', middlewares.isAdmin, function (req, res) {

    try {
       
        let idCategorie = req.params.id_category
        console.log(req.body);
      
        let updateCategory = `UPDATE category SET denomination = '${req.body.denomination}' WHERE id_category = '${idCategorie}' `;

    con.query(updateCategory, function(err, resulta){
        if (err) throw err;
        console.log(resulta);
        res.status(200).send(resulta)
    })
    } catch (error) {
        res.status(400);
    }
    
 });

 router.delete('/category/:id_category', middlewares.isAdmin, function(req,res){
    try {
        let idCategorie = req.params.id_category

       let deleteCategories = `DELETE FROM category WHERE id_category = '${idCategorie}'`
       con.query(deleteCategories, function(err,resultat){
           
           if (err) throw err;
           console.log("Number of records deleted: " + resultat.affectedRows);
           res.status(200).send(resultat)
       })
    } catch (error) {
        res.status(400);
        
    }
  
})


module.exports = router;