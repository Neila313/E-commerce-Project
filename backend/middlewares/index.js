const jwt = require('jsonwebtoken');
const config = require('../routes/config.js').secret;
const con = require('../bdd/db');

const isAdmin = (req, res, next) => {
	let tokenAdmin = req.headers.authorization;
	if (tokenAdmin) {
		const token = tokenAdmin.split(' ')[1];
		jwt.verify(token, 'supersecret', async (err, decoded) => {
			if (err) {
				res.status(203).json({ error: "Vous n'êtes pas autorisé à entrer" });
			} else {
				const [result] = await con.query(`SELECT * FROM admin WHERE id_admin = '${decoded.id}'`);
				if (result.length === 0) {
					return res.status(203).json({ error: "Vous n'êtes pas autorisé à entrer" });
				}
				next();
			}
		});
	} else {
		res.status(400).json({ error: "Vous n'avez pas de token" });
	}
};

const checkEmail = async (req, res, next) => {
	const [result] = await con.query('SELECT * FROM admin WHERE email = ?', [ req.body.email ]);
	if (result.length > 0) {
		console.log('email already exist');
		return res.status(400).json({ error: 'email already exist' });
	}
	next();
};

const isCustomer = (req, res, next) => {
	req.user = null;
	let tokenClient = req.headers.authorization;
	if (!tokenClient) {
		return next();
	}
	const token = tokenClient.split(' ')[1];
	jwt.verify(token, 'supersecret', async (err, decoded) => {
		if (err) {
			res.status(401).json({ error: "Vous n'êtes pas autorisé à entrer" });
		} else {
			const [result] = await con.query(`SELECT * FROM customer WHERE id_customer = '${decoded.id}'`);
			if (result.length === 1) {
				req.user = result[0];
				next();
			} else {
				res.status(401).json({ error: "Vous n'êtes pas autorisé à entrer" });
			}
		}
	});
};

module.exports = { isAdmin, checkEmail, isCustomer };
