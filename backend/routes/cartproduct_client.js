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
			throw new Error("Vous n'êtes pas autorisé à entrer, testest");
		}
		const [ results ] = await con.query(`SELECT id_cart FROM cart WHERE id_customer = ? AND ordered = ?`, [
			req.user.id_customer,
			0
        ]);
        let id;

		if (results.length === 0) {
			const resulta = await con.query(`INSERT INTO cart (ordered, id_customer) VALUES (?, ?)`, [
				0,
				req.user.id_customer
            ]);
            console.log(resulta);
            id = resulta.insertId;
        } else {
            id = results[0].id_cart;
        }
        const [productAlreadyIn] = await con.query('SELECT qte FROM cartproduct WHERE id_cart = ? AND id_product = ?', []);
        if (productAlreadyIn.length > 0) {
            const newQty = productAlreadyIn[0].qte + parseInt(req.body.quantity);
            await con.query('UPDATE cartproduct SET qte = ? WHERE id_cart = ? AND id_product = ?', [newQty, cartId, productId]);
        } else {
		const newCartProd = `INSERT INTO cartproduct 
                   (quantity,id_cart,id_product) VALUES
                   (?, ?,?)`;

		const [thecartprod] = await con.query(newCartProd, [ req.body.quantity, results[0].id_cart, req.body.id_product ]);
        }
		res.status(200).json(thecartprod);
		console.log(thecartprod);
		console.log(results);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

// router.get('/cartproduct', function(req,res){
//     try {
//         con.query(`SELECT * FROM cartproduct`, function(err,cartprod){
//             if(err) throw err;
//             console.log(cartprod)
//             res.status(200).json(cartprod)
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).send(error);
//     }
// });

router.get('/cartproduct/', middlewares.isCustomer, async function(req, res) {
	console.log(req.user);

	try {
		if (req.user === null) {
			throw new Error("Vous n'êtes pas autorisé à entrer, testest");
		}
		const [results] = await con.query(
			`SELECT id_cart FROM cart WHERE id_customer = ? AND ordered = ?`,
			[ req.user.id_customer, 0 ]);
		console.log(results);
		console.log('//////////');

		if (results.length === 0) {
			return res.send([]);
		}
		const [cartprod] = await con.query(`SELECT * FROM cartproduct WHERE id_cart = ?`, [ results[0].id_cart ]);
		console.log(cartprod);
		res.status(200).json(cartprod);
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
});

module.exports = router;
