const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
// const fs = require('fs').promises;

router.use(cors());

	router.post('/sign-up', async function(req, res) {
		try {
			const hash = await bcrypt.hash(req.body.password, saltRounds);
			let dataCustomer = `INSERT INTO customer (lastname, firstname, email, password) VALUES
               ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${hash}')`;

			const [result] = await con.query(dataCustomer);
			res.status(200).send('New User added');
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
					console.log(token);
					res.status(200).send({ token: token });
				} else {
					res.status(401).send('Mots de passe incorrect');
				}
			}
		} catch (error) {
			console.log(error);
			res.status(400).send(error, "async");
		}
	});

	router.get('/customer', async function(req, res) {
    const token = req.headers.authorization.split(' ')[1]
    let decoded = jwt.decode(token);
    console.log(decoded);
				
		// TODO: Ajouter 
		const [result] = await con.query(`SELECT id_customer, lastname, firstname  FROM customer`);
		res.status(200).send(result[0]);
	});

module.exports = router;
