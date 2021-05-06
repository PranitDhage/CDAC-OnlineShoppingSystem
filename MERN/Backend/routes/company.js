const express = require('express');
const db = require('../db');
const utils = require('../utils');

// router will be used to add routes in the app server
const router = express.Router();

// Get Company Details
router.get('/company', (request, response) => {
	const statement = `SELECT comp_id, comp_title, comp_description FROM company`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Insert new categoty
router.post('/company', (request, response) => {
	console.log('in post compnay');
	const { comp_title, comp_description } = request.body;
	const statement = `INSERT INTO company(comp_title, comp_description) VALUES('${comp_title}', '${comp_description}')`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Update Company
router.post('/company/update', (request, response) => {
	const {comp_id, comp_title, comp_description } = request.body;
	console.log(`title-->${comp_title} desciption-->${comp_description}`);
	const statement = `UPDATE company SET comp_title = '${comp_title}', comp_description = '${comp_description}' WHERE comp_id = '${comp_id}'`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

// Delete Category
router.delete('/company/:id', (request, response) => {
	const { id } = request.params;
	const statement = `DELETE FROM company WHERE comp_id = '${id}'`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

module.exports = router;
