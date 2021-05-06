const { request, response } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

// router will be used to add routes in the app server
const router = express.Router()

//apply for seller
router.patch('/seller/apply', (request, response) => {
  const statement = `update user set user_role ='CUSTSELL' where user_id = ${request.id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Add New Product
router.post('/seller/add_product', (request, response) => {
  const {
    prod_title,
    prod_description,
    cat_id,
    prod_price,
    comp_id,
    prod_qty,
  } = request.body
  const statement = `INSERT INTO product (prod_title, 
	  prod_description, cat_id, prod_price,
		comp_id, prod_qty,seller_id) VALUES 
		   ('${prod_title}','${prod_description}', '${cat_id}', '${prod_price}', '${comp_id}','${prod_qty}','${request.id}')`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get All Products
router.get('/seller/product', (request, response) => {
  const statement = `SELECT * FROM product where seller_id='${request.id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get  All Max Selling Products for seller
router.get('/seller/Max/product', (request, response) => {
  console.log(`in backend seller/max/product`)
  const statement = `
  SELECT
    product.prod_title, 
    sum(orderdetails.quantity) as
     no_of_qty
  FROM
    product
    INNER JOIN
    orderdetails
    ON 
      product.prod_id = orderdetails.product_id
  WHERE
    product.seller_id = '${request.id}'
  GROUP BY
    product.prod_title
  ORDER BY
    2 desc
  LIMIT 5;`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//getting total revenue

//Get  All Max Selling Products for seller
router.get('/seller/total/revenue', (request, response) => {
  console.log(`in backend seller/max/product`)
  const statement = `
SELECT
product.seller_id,
      sum( orderdetails.price*
orderdetails.quantity) as total_price
FROM
product
INNER JOIN
orderdetails
ON 
  product.prod_id = orderdetails.product_id
WHERE
product.seller_id = '${request.id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get  All Max Selling Products for seller
router.get('/seller/avg/rating', (request, response) => {
  console.log(`in backend /seller/avg/rating`)
  const statement = `
SELECT
product.seller_id, 

round(
(avg(orderdetails.rating)/5)*100 ,2)as rating_per
FROM
product
INNER JOIN
orderdetails
ON 
  product.prod_id = orderdetails.product_id
WHERE
product.seller_id = '${request.id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//getting monthly revenue
router.get('/seller/month/revenue', (request, response) => {
  console.log(`in backend /seller/month/revenue`)
  const statement = `
  SELECT
	sum( orderdetails.price* 
	orderdetails.quantity) as total, 
	
	product.seller_id
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
substring(now(), 1, 7) = substring(myorder.orderDate, 1, 7) and
	product.seller_id = '${request.id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// Get myorder Details for all customers related to perticular seller
router.get('/seller/alluserorders', (request, response) => {
  console.log('inside get myorder list')
  const statement = `
  SELECT 
    product.prod_title,
    product.photo, 
    product.prod_price, 
    myorder.user_id,
    myorder.add_id, 
    myorder.total_price,
    myorder.orderDate, 	
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
    product.seller_id = ${request.id} ORDER BY myorder.myorder_id DESC`

  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
