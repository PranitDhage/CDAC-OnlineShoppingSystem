const express = require('express');
const db = require('../db');
const utils = require('../utils');

// router will be used to add routes in the app server
const router = express.Router();

// Get Payment Details
router.get('/payment', (request, response) => {
	const statement = `SELECT pay_id, user_id, pay_amount, orderdetails_id, pay_date, pay_type FROM payment`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});



// Get Payment Details
router.get('/payment/total', (request, response) => {
	const statement = `select sum(pay_amount) as TotalRevenue from payment;`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

module.exports = router;
