const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cors = require('cors');
const jwt = require('jsonwebtoken');
const config = require('./config');
const middlewares = require('../middlewares/');

router.use(cors());

// Route permettant à l'administrateur de se créer un compte
// Nous avons hasher le mots de passe pour sécurisé le compte et chaque admin aura un token "jeton" permettra à l'admin de se connecter pour sécuriser le compte
// router.use('/sign-up', middlewares.checkEmail);
router.post('/sign-up', async function(req, res) {
	try {
		const hash = await bcrypt.hash(req.body.password, saltRounds);
		let dataAdmin = `INSERT INTO admin (lastname, firstname, email, password) VALUES (?, ?, ?, ?)`;

		await con.query(dataAdmin, [ req.body.lastname, req.body.firstname, req.body.email, hash ]);

		res.status(200).json({ message: 'New Admin added' });
	} catch (error) {
		if (error.errno === 1062) {
			return res.status(400).json({ error: 'email already exist' });
		}
		res.status(500).send(error.message);
	}
});

// Route permettant à l'admin de se connecter, ici nous comparons l'email entré par rapport à celui présent dans la bdd ainsi que le mots de passe. Nous vérifions également que l'admin a un jeton si non l'accès lui sera refusé.

router.post('/sign-in', async function(req, res) {
	try {
		const [ result ] = await con.query('SELECT * FROM admin WHERE email = ?', [ req.body.email ]);
		console.log(result[0]);
		if (result.length == 0) {
			console.log(result.length);
			res.status(401).send('Adresse email inconnue');
		} else {
			const resulta = await bcrypt.compare(req.body.password, result[0].password);
			if (resulta) {
				let token = jwt.sign(
					{
						id: result[0].id_admin,
						email: result[0].email,
						admin: true
					},
					config.secret,
					{ expiresIn: 86400 }
				);
				console.log(token);
				res.status(200).send({ token: token });
			} else {
				res.status(203).send('Mots de passe incorrect');
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).send(error.message);
	}
});

// route permettant de récupérer l'admin , par son id nous pourrons accéder à son nom et prénom. Je souhaite utiliser cela afin de personnaliser son dashboard.

router.get('/admin', async function(req, res) {
	try {
		const [result] = await con.query(`SELECT id_admin, lastname, firstname FROM admin`);
		console.log(result[0]);
		res.status(200).send(result[0]);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/admin/:id_admin', async function(req, res) {
	try {
		let idAdmin = req.params.id_admin;
		console.log(idAdmin);

		const [results] =	await con.query(`SELECT id_admin, lastname, firstname, email FROM admin WHERE id_admin = ?`, [idAdmin])
		
		console.log(results);
		res.status(200).json(results);
	} catch (error) {
		res.status(400).send(error)
	}
});

router.put('/admin/:id_admin', middlewares.isAdmin, async function(req, res) {
	try {
		let modifAdmin = req.params.id_admin;
		console.log(modifAdmin);
		const [resultss] = await con.query(`UPDATE admin SET lastname = ?, firstname = ?, email = ? WHERE id_admin = ?`, [
			req.body.lastname,
			req.body.firstname,
			req.body.email,
			modifAdmin
		]);
		console.log(resultss);
		res.status(200).json({message: 'PROFILE HAS BEEN UPDATED'});
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
