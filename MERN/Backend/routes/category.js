const express = require('express');
const db = require('../db');
const utils = require('../utils');

// router will be used to add routes in the app server
const router = express.Router();

// Get Category Details
router.get('/category', (request, response) => {
	const statement = `SELECT cat_id, cat_title, cat_description FROM category`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

//Insert new category
router.post('/category', (request, response) => {
	const { cat_title, cat_description } = request.body
	const statement = `INSERT INTO category(cat_title, cat_description) VALUES('${cat_title}', '${cat_description}')`
	db.execute(statement, (error, data) => {
	  response.send(utils.createResult(error, data))
	})
  })


//Update Category
router.put('/category', (request, response) => {
  const { cat_id, cat_title, cat_description } = request.body
  const statement = `UPDATE category SET cat_title = '${cat_title}', cat_description = '${cat_description}' WHERE cat_id = '${cat_id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Delete Category
router.delete('/category/:id', (request, response) => {
	const { id } = request.params;
	const statement = `DELETE FROM category WHERE cat_id = '${id}'`;
	db.execute(statement, (error, data) => {
		response.send(utils.createResult(error, data));
	});
});

module.exports = router;
