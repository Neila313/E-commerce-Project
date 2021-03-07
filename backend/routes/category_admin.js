const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
var cors = require('cors');
 const middlewares = require('../middlewares/')

router.use(cors());



router.post('/category',middlewares.isAdmin, async function(req, res){

    try {
        const token = req.headers.authorization.split(' ')[1]
        
        let decoded = jwt.decode(token);
        console.log(decoded);

      let newCategory = await `INSERT INTO category 
        (denomination) VALUES
        (?)`; 

       const [thecategory] = await con.query(newCategory, [req.body.denomination]) 
       
        const [results] =   await con.query('SELECT * FROM category WHERE id_category = ?', [thecategory.insertId])
                 res.status(200).json(results)
                 console.log(thecategory);
                 console.log(results);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.get('/category', async function(req,res){

    try {
        const [categ] = await con.query(`SELECT * FROM category`) 
            console.log(categ)
            res.status(200).json(categ)
    } catch (error) {
        console.log(error);
        res.status(400).send(error);  
    }
});
router.get('/category/:id_category', async function(req,res){
    try {
        let idCategori = req.params.id_category
        console.log(idCategori)
       const [result] = await con.query('SELECT * FROM category WHERE id_category = ?', [idCategori]);
       console.log(result);
       res.status(200).send(result);    
    } catch (error) {
        res.status(400);
    }
})

router.put('/category/:id_category', middlewares.isAdmin, async function (req, res) {

    try {
        let idCategorie = req.params.id_category
        let updateCategory =  'UPDATE category SET denomination = ? WHERE id_category = ?';
        const [resulta] = await con.query(updateCategory, [req.body.denomination, idCategorie]);
        res.status(200).send(resulta)
    } catch (error) {
        res.status(400);
    }
    
 });

 router.delete('/category/:id_category', middlewares.isAdmin, async function(req,res){
    try {
        let idCategorie = req.params.id_category

       let deleteCategories = `DELETE FROM category WHERE id_category = '${idCategorie}'`
       const [resultat] = await con.query(deleteCategories);

       console.log("Number of records deleted: " + resultat.affectedRows);
       res.status(200).send(resultat)
    } catch (error) {
        res.status(400);
    }
})


module.exports = router;