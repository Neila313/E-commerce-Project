const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/')

// const fs = require('fs').promises;

router.use(cors());

	router.post('/sign-up', async function(req, res) {
		try {

			// if (req.body.lastname.length < 1) throw 'No name'
			// // le req body est tjrs rempli
			// if (req.body.firstname.length < 1) throw 'No lastname'
			// if (req.body.email.length < 1) throw 'No email'
			// if (req.body.password.length < 1) throw 'No password'

			const hash = await bcrypt.hash(req.body.password, saltRounds);
			let dataCustomer = `INSERT INTO customer (lastname, firstname, email, password) VALUES (?, ?, ?, ?)`;

		await con.query(dataCustomer, [ req.body.lastname, req.body.firstname, req.body.email, hash ]);

		res.status(200).json({ message: 'New User added' });
		} catch (error) {
			res.status(400).send(error.message);
		}
	});


	router.post('/sign-in', async function(req, res) {
		try {
			const [result] = await con.query(`SELECT * FROM customer WHERE email = '${req.body.email}'`);
			if (result.length === 0) {
			 res.status(203).send('Adresse email inconnue');
			} else {
				const passwordValid = await bcrypt.compare(req.body.password, result[0].password);
				if (passwordValid) {
					let token = jwt.sign({ id: result[0].id_customer, email: result[0].email }, config.secret, {
						expiresIn: 86400
					});
					res.status(200).send({ token: token });
				} else {
					res.status(401).send('Mots de passe incorrect');
				}
			}
		} catch (error) {
			res.status(400).send(error, "async");
		}
	});

	// router.get('/customer', async function(req, res) {
    // const token = req.headers.authorization.split(' ')[1]
    // let decoded = jwt.decode(token);
				
	// 	// TODO: Ajouter 
	// 	const [result] = await con.query(`SELECT id_customer, lastname, firstname  FROM customer`);
	// 	res.status(200).send(result[0]);
	// });

	router.get('/user', middlewares.isCustomer, async function(req, res) {
	try {
		// let idAdmin = req.params.id_admin;
		const [results] =	await con.query(`SELECT id_customer, lastname, firstname, email  FROM customer 
		WHERE id_customer = ?`, [req.user.id_customer])
		res.status(200).json(results);
	} catch (error) {
		res.status(400).send(error)
	}
}); 


router.put('/put-user', middlewares.isCustomer, async function(req, res) {
	try {
		const [resultss] = await con.query(`UPDATE customer SET lastname = ?, firstname = ?, email = ? 
		WHERE id_customer = ?`, [
			req.body.lastname,
			req.body.firstname,
			req.body.email,
			req.user.id_customer
		]);
		res.status(200).json({message: 'PROFILE HAS BEEN UPDATED'});
	} catch (error) {
		res.status(400).send(error);
	}
});
module.exports = router;
