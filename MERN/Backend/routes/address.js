const express = require('express')
const db = require('../db')
const utils = require('../utils')

// router will be used to add routes in the app server
const router = express.Router()

// Get Address Details
router.get('/address', (request, response) => {
  const statement = `SELECT * FROM address where user_id=${request.id}`;
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// Get Address Details via myorder_id for order details page
router.get('/address', (request, response) => {
  const { myorder_id } = request.params
  const statement = `SELECT * FROM address where user_id=${request.id}`;
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// Get Address Details via add_id from myorder table for order details page
router.get('/address/:add_id', (request, response) => {
  const { add_id } = request.params
  const statement = `SELECT * FROM address where add_id=${add_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})


//Insert new address
router.post('/address', (request, response) => {
  const { address, city, state, country, pin } = request.body;
  const statement = `INSERT INTO address(user_id, address, city, state, country, pin) VALUES('${request.id}', '${address}', '${city}', '${state}', '${country}', '${pin}')`;
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//Update Address
router.put('/address/:id', (request, response) => {
  const { address, city, state, country, pin } = request.body
  const { id } = request.params
  const statement = `UPDATE address SET address = '${address}', city = '${city}', state = '${state}', country = '${country}', pin = '${pin}' where user_id=${response.id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Delete address
router.delete('/address', (request, response) => {
  const { id } = request.params
  const statement = `DELETE FROM address where user_id=${response.id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
