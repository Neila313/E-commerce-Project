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

con.connect(function(err) {
	if (err) throw err;

	router.post('/sign-up',function(req, res) {
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			try {
				if (err) throw err;
				let dataCustomer = `INSERT INTO customer (lastname, firstname, email, password) VALUES
                ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${hash}')`;

				con.query(dataCustomer, (err, result) => {
					if (err) throw err;
					console.log(result);
					res.status(200).send('New User added');
				});
			} catch (error) {
				res.status(400).send(error);
			}
		});
	});


	router.post('/sign-in', function(req, res) {
		try {
		let promise =  con.query(`SELECT * FROM customer WHERE email = '${req.body.email}'`,  function(err, result) {
				if (result.length == 0) {
				 res.status(203).send('Adresse email inconnue');
				} else {
					bcrypt.compare(req.body.password, result[0].password, function(err, resulta) {
						if (resulta) {
							let token = jwt.sign({ id: result[0].id_customer, email: result[0].email }, config.secret, {
								expiresIn: 86400
							});
							console.log(token);
							res.status(200).send({ token: token });
						} else {
							res.status(203).send('Mots de passe incorrect');
						}
					});
				}
			});
		} catch (error) {
			console.log(error);
			res.status(400).send(error, "async");
		}
	});

	router.get('/customer', function(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.decode(token);
        console.log(decoded);
        
		con.query(`SELECT id_customer, lastname, firstname  FROM customer`, function(err, result) {
			if (err) throw err;
			console.log(result[0]);
			res.status(200).send(result[0]);
		});
	});
});

module.exports = router;
