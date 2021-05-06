const express = require('express')
const db = require('../db')
const utils = require('../utils')

// router will be used to add routes in the app server
const router = express.Router()

// Get myorder Details
router.get('/myorder', (request, response) => {
  console.log('inside get myorder list')
  const statement = ` 
  SELECT 
    product.prod_title,
    product.photo,
    orderdetails.rating,
    orderdetails.comment,   
    product.prod_price, 
    myorder.add_id,
    myorder.user_id, 
    myorder.total_price,
    myorder.orderDate, 	
    orderdetails.orderdetails_id, 	
    orderdetails.myorder_id, 
    orderdetails.product_id, 
    orderdetails.quantity, 
    product.seller_id,
    CASE
      WHEN myorder.status = 0 THEN 'not delivered'
      WHEN myorder.status = 1 THEN 'delivered'
      ELSE 'cancelled'
    END AS status
  FROM
    orderdetails
    INNER JOIN
    myorder
    ON 
      orderdetails.myorder_id = myorder.myorder_id
    INNER JOIN
    product
    ON 
      orderdetails.product_id = product.prod_id
  WHERE
    myorder.user_id = ${request.id} ORDER BY myorder.myorder_id DESC`;
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Update myorder
router.put('/updateMyorder', (request, response) => {
  const { myorder_id, status } = request.body
  console.log('inside updateMyorder ' + myorder_id + ' ' + status)
  const statement = `UPDATE myorder SET status = ${status} WHERE myorder_id = ${myorder_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
