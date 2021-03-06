const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/');

router.use(cors());

router.post('/cartproduct', middlewares.isCustomer, async function(req, res) {
	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer");
		}
		if (req.body.qty < 1) {
			throw new Error("Vous devez choisir au moins 1 produit");
		}
		await con.query(`INSERT INTO cart_line (id_product, id_customer, qty, date_added)
		VALUES (?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE qty=qty+?, date_added=?`, [
			req.body.id_product,
			req.user.id_customer,
			req.body.qty,
			new Date(),
			req.body.qty,
			new Date()
		]);
		res.json({
			message: 'Le produit a bien été ajouté au panier'
		});
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
});



router.get('/cartproduct/', middlewares.isCustomer, async function(req, res) {
	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer, testest");
		}
		const [cart] = await con.query(`SELECT c.id_product, p.name, p.price unit_price, c.qty, (c.qty * p.price) total
		FROM cart_line c
		LEFT JOIN products p ON p.id_product = c.id_product
		WHERE c.id_customer = ?`, [req.user.id_customer]);
		res.json(cart);
	
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});


router.delete('/cartproduct/:id_product', middlewares.isCustomer, async function(req, res) {
	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer");
		}
		if (req.body.decrement == null) {
			await con.query(`DELETE FROM cart_line WHERE id_product = ? AND id_customer = ?`, [
				req.params.id_product,
				req.user.id_customer
			]);
		} else {
			await con.query(`UPDATE cart_line SET qty = qty - 1 WHERE id_product = ? AND id_customer = ?`, [
				req.params.id_product,
				req.user.id_customer
			]);
		}
	
		await con.query('DELETE from cart_line WHERE qty = 0');
		res.json({
			message: 'Le produit a bien été supprimé du panier'
		});
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
});

// router.delete('/cartproduct/', middlewares.isCustomer, async function(req,res){
// 	try {
// 	//    let idProducts = req.params.id_product
// 	if (req.user === null) {
// 		throw new Error("Vous n'êtes pas autorisé à entrer, testest");
// 	}
	
// 	   const deleteCartProducts = con.query(`DELETE FROM cart_line WHERE id_product = ?`, 
// 	   [req.body.id_product]);
// 	   const [resultat] = await con.query(deleteCartProducts);
		   
// 	   console.log("Number of records deleted: " + resultat.affectedRows);
// 	   res.json({
// 		   message: "le produit a bien été supprimé du panier"
// 	   })
// 	} catch (error) {
// 		res.status(400).json({error: error.message});
// 	}
// });


module.exports = router;
