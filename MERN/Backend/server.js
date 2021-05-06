const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// list of routers
const routerUser = require('./routes/user')
const routerCategory = require('./routes/category')
const routerCart = require('./routes/cart')
const routerCompany = require('./routes/company')
const routerAddress = require('./routes/address')
const routerProduct = require('./routes/product')
const routerOrderdetails = require('./routes/orderdetails')
const routerPayment = require('./routes/payment')
const routermyorder = require('./routes/myorder')
const routerAdmin = require('./routes/admin')
const routerSeller = require('./routes/seller')

//use jwt token to encrypt/decrypt user_id
const jwt = require('jsonwebtoken')

const app = express()

//to convert JSON data to string
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// enable frontend application to call the APIs
app.use(cors('*'))

//for enabling image access from frontend
app.use(express.static('images'))

// verify token and extract id from token
const config = require('./config')
app.use((request, response, next) => {
  // skip checking the token for following APIs
  // signin and signup

  if (
    request.url == '/user/signin' ||
    request.url == '/user/signup' ||
    request.url.startsWith('/user/verify') ||
    request.url == '/product' ||
    request.url.startsWith('/productdetails') ||
    request.url.startsWith('/productRatingAvg') ||
    request.url.startsWith('/productComment') ||
    request.url.startsWith('/search')
  ) {
    // skip checking the token
    next()
  } else {
    // get the token from headers
    const token = request.headers['token']
    console.log(token)

    try {
      // verify if the token is original or intact
      const payload = jwt.verify(token, config.secret)
      console.log(payload)

      // get id from the token
      // add the user id in the request object so that it can be used
      // in ever other APIs
      request.id = payload['id']

      // call the next handler
      next()
    } catch (ex) {
      response.send({
        status: 'error',
        error: 'unauthorized access',
      })
    }
  }
})

// add routers
app.use('/user', routerUser)
app.use(routerCategory)
app.use(routerCart)
app.use(routerCompany)
app.use(routerAddress)
app.use(routerProduct)
app.use(routerOrderdetails)
app.use(routerPayment)
app.use(routermyorder)
app.use(routerAdmin)
app.use(routerSeller)

app.get('/', (request, response) => {
  response.send('welcome to ecommerce application')
})

app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})
