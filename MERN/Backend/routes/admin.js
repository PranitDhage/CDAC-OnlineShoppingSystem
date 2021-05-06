const { request, response } = require('express')
const express = require('express')
const db = require('../db')
const utils = require('../utils')

// router will be used to add routes in the app server
const router = express.Router()

// show list of all users
router.get('/admin/user', (request, response) => {
  const statement = `select user_id,user_name,user_email,user_role,	
   CASE
   WHEN user_status = 0 THEN 'not verified'
   WHEN user_status = 1 THEN 'verified'
   ELSE 'suspended'
  END AS user_status from user where user_role = 'CUSTOMER'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

// show list of all seller
router.get('/admin/seller', (request, response) => {
  const statement = `select user_id,user_name,user_email,user_role,	
   CASE
   WHEN user_status = 0 THEN 'not verified'
   WHEN user_status = 1 THEN 'verified'
   ELSE 'suspended'
  END AS user_status from user where user_role = 'SELLER' OR user_role ='CUSTSELL'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//approve seller request
router.post('/admin/approve-seller', (request, response) => {
  const { user_id } = request.body
  const statement = `update user set user_role = 'SELLER' where user_id =${user_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//suspend seller request
router.post('/admin/suspend-seller', (request, response) => {
  const { user_id } = request.body

  const statement = `update user set user_role ='CUSTOMER' where user_id = ${user_id}`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//suspend user
router.patch('/admin/suspend_user/:user_id', (request, response) => {
  const { user_id } = request.params
  const statement = `update user set user_status = 2 where user_id ='${user_id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

//Get All Products For Admin
router.get('/admin/product', (request, response) => {
  const statement = `SELECT  * FROM product`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

module.exports = router
