const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
var cors = require('cors');
const middlewares = require('../middlewares/')

router.use(cors());

router.post('/favoris', middlewares.isCustomer, async function(req, res) {
	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer");
		}
       
        await con.query(`INSERT INTO favoris (id_product, id_customer)
		VALUES (?, ?)`, [
			req.body.id_product,
			req.user.id_customer,
		]);       
		res.json({
			message: 'Le produit a bien été ajouté au favoris',
			isFavoris: true
		});
	} catch (e) {
		console.log(e);
		if (e.errno === 1062) {
			await con.query(`DELETE FROM favoris 
			WHERE id_product = ? AND id_customer = ?`, [
				req.body.id_product,
				req.user.id_customer
			]);
			return res.json({
				message: 'Le produit a bien été retiré de vos favoris',
				isFavoris: false

			});
		}
		res.status(401).json({ error: e.message });
	}
});

router.get('/favoris/', middlewares.isCustomer, async function(req, res) {
	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer, testest");
		}
		const [favoris] = await con.query(`SELECT f.id_product, p.name,p.description, p.details,p.image, p.price, p.id_category
		FROM favoris f
		LEFT JOIN products p ON p.id_product = f.id_product
		WHERE f.id_customer = ?`, [req.user.id_customer]);
		res.json(favoris);
	console.log("ffff",favoris);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});


router.delete('/favoris/:id_product', middlewares.isCustomer, async function(req, res) {
	try {
        let idProduct = req.params.id_product

		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer");
		}

		await con.query(`DELETE from favoris WHERE id_product = ${idProduct}`);
		res.json({
			message: 'Le produit a bien été supprimé des favoris'
		});
	} catch (e) {
		res.status(401).json({ error: e.message });
	}
});

 module.exports = router;