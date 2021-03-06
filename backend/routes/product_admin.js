const con = require('../bdd/db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('./config');
var cors = require('cors');
const middlewares = require('../middlewares/');

router.use(cors());

// router.use('/products', middlewares.isAdmin)
router.post('/products', middlewares.isAdmin, async function(req, res) {
	try {
		const token = req.headers.authorization.split(' ')[1];

		let decoded = jwt.decode(token);
		console.log(decoded);

		let newProduct = `INSERT INTO products 
        (name, description, details, price, image, id_admin,id_category) VALUES
        (?, ?, ?,
        ?, ?, ?, ?)`;

		const [ theproduct ] = await con.query(newProduct, [
			req.body.name,
			req.body.description,
			req.body.details,
			req.body.price,
			req.body.image,
			decoded.id,
			req.body.id_category
		]);
		const [ results ] = await con.query(`SELECT * FROM products WHERE id_product = '${theproduct.insertId}'`);
		res.status(200).json(results);
		console.log(theproduct);
		console.log(results);
	} catch (error) {
		res.send(error.message);
	}
});

router.get('/products', async function(req, res) {
	try {
		let [ prod ] = await con.query(`SELECT * FROM products`);
		return res.status(200).json(prod);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get('/products/:id_product', async function(req, res) {
	try {
		let idProducts = req.params.id_product;
		const [ result ] = await con.query(`SELECT * FROM products WHERE id_product = ${idProducts}`);

		console.log(result);
		res.status(200).send(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.put('/products/:id_product', middlewares.isAdmin, async function(req, res) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		let decoded = jwt.decode(token);
		console.log(decoded);
		let idProducts = req.params.id_product;
		console.log(req.body);
		// let updateProduct = `UPDATE products
		// (name, description, price, image, id_admin,id_category) VALUES
		// (?, ?, ?,
		// ?, ?, ?)`;

		let desc = req.body.description;
		desc = desc.replace(/'/g, ' ');
		desc = desc.replace(/`/g, ' ');

		let det = req.body.details;
		det = det.replace(/'/g, ' ');
		det = det.replace(/`/g, ' ');

		let nameProd = req.body.name;
		nameProd = nameProd.replace(/'/g, ' ');
		nameProd = nameProd.replace(/`/g, ' ');
		console.log(nameProd);

		let updateProduct = `UPDATE products SET name = '${nameProd}', description = '${desc}', details = '${det}', price = '${req
			.body.price}', image =' ${req.body.image}', id_category = '${req.body
			.id_category}', id_admin = '${decoded.id}' WHERE id_product = '${idProducts}' `;

		const [ resulta ] = await con.query(updateProduct);
		console.log(resulta);
		res.status(200).send(resulta);
	} catch (error) {
		res.status(400);
	}
});

router.delete('/products/:id_product', middlewares.isAdmin, async function(req, res) {
	try {
		let idProducts = req.params.id_product;

		let deleteProducts = `DELETE FROM products WHERE id_product = '${idProducts}'`;
		const [ resultat ] = con.query(deleteProducts);

		console.log('Number of records deleted: ' + resultat.affectedRows);
		res.status(200).send(resultat);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// router.put('/products', function (req, res) {
//     connection.query('UPDATE `products` SET `name`=?,`description`=?,`category`=?, `price`=?, `image`=? WHERE `id_product`=?', [req.body.name,req.body.description, req.body.category, req.body.price, req.body.image, req.body.id_product], function (error, results, fields) {
//        if (error) throw error;
//        res.end(JSON.stringify(results));
//      });
//  });

module.exports = router;
