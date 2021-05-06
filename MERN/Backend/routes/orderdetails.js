const { request, response } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

// router will be used to add routes in the app server
const router = express.Router()

module.exports = router

//Get Orderdetails Contents
router.get('/orderdetails/:myorder_id', (request, response) => {
  const { myorder_id } = request.params
  console.log('orderdetails' + myorder_id)
  const statement = `SELECT
	product.prod_title, 
	orderdetails.price, 
	orderdetails.quantity, 
	myorder.user_id, 
	address.address, 
	address.city, 
	address.state, 
	address.country, 
	address.pin, 
	orderdetails.orderdetails_id, 
	orderdetails.rating,
	orderdetails.comment,
	myorder.myorder_id, 
	product.prod_id
FROM
	address
	INNER JOIN
	user
	ON 
		address.user_id = user.user_id
	INNER JOIN
	myorder
	ON 
		user.user_id = myorder.user_id
	INNER JOIN
	orderdetails
	ON 
		myorder.myorder_id = orderdetails.myorder_id
	INNER JOIN
	product
	ON 
		orderdetails.product_id = product.prod_id
		where orderdetails.myorder_id = ${myorder_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get Orderdetails to Admin
router.get('/orderdetails', (request, response) => {
  const statement = `SELECT
	orderdetails.*, 
	product.prod_title
FROM
	product
	INNER JOIN
	orderdetails
	ON 
		product.prod_id = orderdetails.product_id` // where myorder_id = ${myorder_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Insert new content in Orderdetails
router.post('/rateProduct', (request, response) => {
  const { orderdetails_id, rating, comment } = request.body
  const statement = `UPDATE orderdetails SET rating = ${rating}, comment = '${comment}' where orderdetails_id =  ${orderdetails_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get rating Contents
router.get('/rating', (request, response) => {
  const statement = `
	select round((sum(rating)/(count(rating) * 5 ) * 100 ), 2) as Customer_satisfaction from orderdetails`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get max product Contents
router.get('/max/product/sales', (request, response) => {
  const statement = `select p.prod_title,sum(o.quantity) as no_of_sale_product from orderdetails as o inner join product as p on o.product_id=p.prod_id group by product_id order by 2 desc LIMIT 1`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get Bar Chart Revenue Contents
router.get('/month/revenue', (request, response) => {
  const statement = `select  substring(pay_date, 1, 7) as month, sum(pay_amount) as revenue from payment group by month ORDER BY 1 DESC LIMIT 12`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})
