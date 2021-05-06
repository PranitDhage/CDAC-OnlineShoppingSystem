const express = require('express')
const db = require('../db')
const config = require('../config')
const utils = require('../utils')
const crypto = require('crypto-js')
const mailer = require('../mailer')
const { request, response } = require('express')

//use jwt token to  encrypt user_id
const jwt = require('jsonwebtoken')

// for checkout in order to perform transaction
const mysql2 = require('mysql2/promise')
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})
const moment = require('moment')

// router will be used to add routes in the app server
const router = express.Router()

//Signup
router.post('/signup', (request, response) => {
  const { name, email, phone, password } = request.body // get sign up details from request
  // Password Encryption`
  const encPwd = '' + crypto.SHA256(password)
  const statement = `INSERT INTO user(user_name, user_email, user_phone, user_password) values('${name}','${email}','${phone}','${encPwd}')`
  console.log(encPwd)
  db.execute(statement, (error, data) => {
    // result
    const result = utils.createResult(error, data)

    if (!error) {
      mailer.sendEmail(
        'welcome to ecommerce application',
        `Confirm Your Email <a href='http://localhost:4000/user/verify/${email}'>Here</a>`,
        email,
        (error, info) => {
          response.send(result)
        }
      )
      console.log('Inide user mailer send')
    } else {
      response.send(result)
    }
  })
})

//Signin
router.post('/signin', (request, response) => {
  const { email, password } = request.body

  // encrypt the password
  const encryptedPassword = '' + crypto.SHA256(password)

  const statement = `SELECT * FROM user WHERE user_email = '${email}' and user_password = '${encryptedPassword}'`

  db.execute(statement, (error, users) => {
    const result = {
      status: '',
    }

    if (error != null) {
      // error while executing statement
      result['status'] = 'error'
      result['error'] = error
    } else {
      if (users.length == 0) {
        // user does not exist
        result['status'] = 'error'
        result['error'] = 'User does not exist'
      } else {
        const user = users[0]

        // check the user status
        // 0: non-verified, 1: active, 2: suspended
        if (user['status'] == 0) {
          result['status'] = 'error'
          result['error'] =
            'You have not verified your account yet. Please verify your account.'
        } else if (user['status'] == 2) {
          result['status'] = 'error'
          result['error'] =
            'Your account is suspended, please contact administrator'
        } else {
          const payload = { id: user['user_id'] }
          const token = jwt.sign(payload, config.secret)

          result['status'] = 'success'
          result['data'] = {
            token: token,
            name: user['user_name'],
            email: user['user_email'],
            phone: user['user_phone'],
            role: user['user_role'],
          }
        }
      }

      response.send(result)
    }
  })
})

//Edit Profile
router.post('/edit', (request, response) => {
  const { name, password, phone } = request.body

  // encrypt the password
  const encryptedPassword = '' + crypto.SHA256(password)

  const { id } = request.params
  const statement = `UPDATE user SET user_name='${name}',user_password='${encryptedPassword}',user_phone='${phone}' WHERE user_id='${request.id}'`
  db.execute(statement, (error, data) => {
    const result = utils.createResult(error, data)
    response.send(result)
  })
})

//verify Email
router.get('/verify/:email', (request, response) => {
  const { email } = request.params
  const statement = `UPDATE user SET user_status = 1 where user_email = '${email}'`
  db.execute(statement, (error, data) => {
    // result
    const result = utils.createResult(error, data)
    response.send(result)
  })
})

//approve user
router.post('/approve-user', (request, response) => {
  const { id } = request.body
  const statement = `UPDATE user SET user_status = 1 where user_id = ${id}`
  db.execute(statement, (error, data) => {
    // result
    const result = utils.createResult(error, data)
    response.send(result)
  })
})

//suspend user
router.post('/suspend-user', (request, response) => {
  const { id } = request.body
  const statement = `UPDATE user SET user_status = 2 where user_id = ${id}`
  db.execute(statement, (error, data) => {
    // result
    const result = utils.createResult(error, data)
    response.send(result)
  })
})

//View Order
//join myorder, orderdetails, payment(for payment id)
router.get('/orders', (request, response) => {
  //Product Id,Product Title, Product Price, Product Qty, Payment Amount,Payment Date, Payment type(optional)
  //Product name(product table), orderdetails orderstatus
  const statement = `SELECT
	product.prod_title, orderdetails.quantity, 
	CASE
		WHEN myorder.status = 0 THEN 'not delivered'
		WHEN myorder.status = 1 THEN 'delivered'
    	ELSE 'cancelled'
	END AS status, 
	payment.pay_amount, payment.pay_date, product.prod_price
	FROM myorder
	INNER JOIN
		orderdetails
			ON 
			myorder.myorder_id = orderdetails.myorder_id
	INNER JOIN
		product
			ON 
			orderdetails.product_id = product.prod_id
	INNER JOIN
		payment
			ON 
			orderdetails.orderdetails_id = payment.orderdetails_id
	where myorder.user_id = '${request.id}'`
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data))
  })
})

router.post('/checkout', (request, response) => {
  let { pay_type, add_id } = request.body
    // closure
    ; (async () => {
      // step 1:
      // - get all the products from cart
      const statementCart = `
			select 
				c.cart_id as cart_id,
				p.prod_id as prod_id, 
				p.prod_title as prod_title, 
				p.prod_price as prod_price,
				c.cart_quantity as cart_quantity
			from cart c
				inner join product p on c.prod_id = p.prod_id
				where c.user_id = ${request.id}`

      const [cart_items] = await pool.execute(statementCart)

      //create a total variable to calculate total cart items value
      for (const item of cart_items) {
        let total = 0
        total += item['cart_quantity'] * item['prod_price']
        // total = total + ( item['cart_quantity'] * item['prod_price'] )

        console.log(total)

        // steps 2:
        // - add these products to an order
        const date = moment().format('YYYY-MM-DD, hh:mm:ss');
        const statementMyOrder = `
          insert into myorder 
            (user_id, total_price, orderDate, add_id)
          values
            (${request.id}, ${total}, '${date}', ${add_id})
          `

        console.log(statementMyOrder)

        // place an order
        const [myorder] = await pool.execute(statementMyOrder)
        console.log(myorder)

        // get the myorder_id
        const myorder_id = myorder['insertId']

        //insert all cart items one by one in order details table

        const statementOrderDetails = `
				insert into orderdetails 
					(myorder_id, product_id, price, quantity)
				values
					(${myorder_id}, ${item['prod_id']}, ${item['prod_price']}, ${item['cart_quantity']})`
        console.log(statementOrderDetails)
        await pool.execute(statementOrderDetails)

        //make payment 	//Insert into Payment
        if (pay_type == undefined) {
          pay_type = 0
        }
        const statementPayment = `INSERT INTO payment(user_id, pay_amount, myorder_id, pay_date, pay_type) VALUES('${request.id}', '${total}', '${myorder_id}', '${date}', '${pay_type}')`
        await pool.execute(statementPayment)
      }

      // step 3
      // - delete all the items from the cart
      const statementCartDeleteItems = `delete from cart where user_id = ${request.id}`
      await pool.execute(statementCartDeleteItems)

      response.send({ status: 'success' })
    })()
})

module.exports = router
