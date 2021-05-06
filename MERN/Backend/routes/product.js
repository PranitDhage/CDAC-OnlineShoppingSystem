const { request, response } = require('express');
const express = require('express');
const db = require('../db');
const utils = require('../utils');
const multer = require('multer')

// router will be used to add routes in the app server
const router = express.Router();
const upload = multer({ dest: './images' })

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

//Get All Products
router.get('/product', (request, response) => {
	const statement = `SELECT * FROM product`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

router.post('/search/product', (request, response) => {
	const { product_name } = request.body
	const statement = `SELECT * FROM product where  prod_title like '%${product_name}%'`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Get Products Details
router.get('/productdetails/:prod_id', (request, response) => {
	const { prod_id } = request.params;
	const statement = `SELECT  * FROM product where prod_id=${prod_id}`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Get Product Comments
router.get('/productComment/:prod_id', (request, response) => {
	const { prod_id } = request.params;
	const statement = `
	SELECT
		user.user_name, 
		orderdetails.rating, 
		orderdetails.comment, 
		orderdetails.product_id,
		myorder.orderDate
	FROM
		user
		INNER JOIN
		myorder
		ON 
			user.user_id = myorder.user_id
		INNER JOIN
		orderdetails
		ON 
			myorder.myorder_id = orderdetails.myorder_id
	WHERE
		product_id = ${prod_id}`

	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Get Product Ratings
router.get('/productRatingAvg/:prod_id', (request, response) => {
	const { prod_id } = request.params;
	const statement = `SELECT AVG(rating) as rating FROM orderdetails WHERE product_id = ${prod_id}`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

// Add New Product
router.post('/addproduct', upload.single('photo'), (request, response) => {
	const { prod_title, prod_description, cat_id, prod_price, comp_id, prod_qty } = request.body;
	const statement = `INSERT INTO product 
	(prod_title, prod_description, cat_id, prod_price, comp_id, prod_qty, seller_id, photo) VALUES 
         ('${prod_title}','${prod_description}', '${cat_id}', '${prod_price}', '${comp_id}','${prod_qty}'
		 ,${request.id}, '${request.file.filename}')`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

// Update Products
router.put('/product/:prod_id', (request, response) => {
	const { prod_id } = request.params;
	const { prod_title, prod_description, cat_id, prod_price, comp_id, prod_qty } = request.body;
	const statement = `UPDATE product SET 
	prod_title = '${prod_title}',
	prod_description = '${prod_description}', 
	cat_id = '${cat_id}',
	prod_price = '${prod_price}',
	comp_id = '${comp_id}',
	prod_qty = '${prod_qty}'
	WHERE prod_id = ${prod_id}`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Delete Product
router.delete('/product/:prod_id', (request, response) => {
	const { prod_id } = request.params;

	const statement = `DELETE FROM product where prod_id = ${prod_id}`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

// router.patch("/product/quantity/:prod_id", (request, response) => {
//   const { prod_id } = request.params;
//   const { quantity } = request.body;

//   const statement = `update product set prod_qty = ${quantity} where prod_id = ${prod_id}`;
//   db.execute(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// router.patch("/product/price/:prod_id", (request, response) => {
//   const { prod_id } = request.params;
//   const { price } = request.body;

//   const statement = `update product set prod_price = ${price} where prod_id = ${prod_id}`;
//   db.execute(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// for checkout in order to perform transaction
const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: 3306,
	database: 'project',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

router.post('/product/update', upload.single('photo'), async (request, response) => {
	const { prod_id, prod_title, prod_price, prod_qty } = request.body;

	const s = `select * from product where prod_id = ${prod_id}`

	const [product] = await pool.execute(s);

	let oldPhoto = null;
	for (const p of product) {
		oldPhoto = p['photo'];
	}
	if (oldPhoto != null) {
		try {
			await unlinkAsync('./images/' + `${oldPhoto}`)
		} catch (error) {
		}
	}

	const statement = `update product set prod_price = ${prod_price}, 
	prod_title='${prod_title}', prod_qty=${prod_qty}, photo='${request.file.filename}' 
	where prod_id = ${prod_id}`;

	await pool.execute(statement);
	response.send({ status: 'success' });
});

module.exports = router;
