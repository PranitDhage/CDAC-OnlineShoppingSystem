import axios from 'axios'
import { request_url } from '../config/url'
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from './../constants/productConstants'

import {
  SELLER_APPLY_REQUEST,
  SELLER_APPLY_SUCCESS,
  SELLER_APPLY_FAIL,
} from './../constants/userConstants'

import {
  SELLER_MAX_SELLING_PROD_REQUEST,
  SELLER_MAX_SELLING_PROD_SUCCESS,
  SELLER_MAX_SELLING_PROD_FAIL,
  SELLER_TOTAL_REVENUE_REQUEST,
  SELLER_TOTAL_REVENUE_SUCCESS,
  SELLER_TOTAL_REVENUE_FAIL,
  SELLER_CUST_RATING_REQUEST,
  SELLER_CUST_RATING_SUCCESS,
  SELLER_CUST_RATING_FAIL,
  SELLER_MONTHLY_REVENUE_REQUEST,
  SELLER_MONTHLY_REVENUE_SUCCESS,
  SELLER_MONTHLY_REVENUE_FAIL,
  SELLER_ALL_CUSTOMER_MYORDERS_REQUEST,
  SELLER_ALL_CUSTOMER_MYORDERS_SUCCESS,
  SELLER_ALL_CUSTOMER_MYORDERS_FAIL,
} from './../constants/sellerConstants'

export const getProductList = () => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_FETCH_REQUEST,
    })

    const url = request_url + '/seller/product'

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

//Update seller product
export const updateProduct = (
  prod_id,
  prod_title,
  prod_price,
  prod_qty,
  productPhoto
) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

    const formData = new FormData()

    formData.append('prod_title', prod_title)
    formData.append('prod_id', prod_id)
    formData.append('prod_price', prod_price)
    formData.append('prod_qty', prod_qty)
    formData.append('photo', productPhoto)

    const url = request_url + '/product/update'
    console.log(` update product --.>prod_id--->${prod_id} 
                  prod_title--->${prod_title}  prod_price--->${prod_price} 
                  prod_qty--->${prod_qty} prod_qty--->${productPhoto}`)

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .post(url, formData, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}

export const applyForSeller = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_APPLY_REQUEST,
    })

    const url = request_url + '/seller/apply'

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }
    console.log(sessionStorage.token)

    const body = {}

    axios
      .patch(url, body, header)
      .then((response) => {
        dispatch({
          type: SELLER_APPLY_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_APPLY_FAIL,
          payload: error,
        })
      })
  }
}

export const getSellerMaxSaleProducts = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_MAX_SELLING_PROD_REQUEST,
    })

    const url = request_url + '/seller/Max/product'
    console.log(`in get seller max sale productss`)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: SELLER_MAX_SELLING_PROD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_MAX_SELLING_PROD_FAIL,
          payload: error,
        })
      })
  }
}

export const getSellerTotalRevenue = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_TOTAL_REVENUE_REQUEST,
    })

    const url = request_url + '/seller/total/revenue'
    console.log(`in get seller max sale productss`)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: SELLER_TOTAL_REVENUE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_TOTAL_REVENUE_FAIL,
          payload: error,
        })
      })
  }
}

//get seller customer satisfaction
export const getSellerCustAvgRating = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_CUST_RATING_REQUEST,
    })

    const url = request_url + '/seller/avg/rating'
    console.log(`in get seller max sale productss`)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: SELLER_CUST_RATING_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_CUST_RATING_FAIL,
          payload: error,
        })
      })
  }
}

//get seller customer satisfaction
export const getSellerMonthlyRevenue = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_MONTHLY_REVENUE_REQUEST,
    })

    const url = request_url + '/seller/month/revenue'
    console.log(`in get seller max sale productss`)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: SELLER_MONTHLY_REVENUE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_MONTHLY_REVENUE_FAIL,
          payload: error,
        })
      })
  }
}

//get seller customer satisfaction
export const getAllCustomersMyOrdersForSeller = () => {
  return (dispatch) => {
    dispatch({
      type: SELLER_ALL_CUSTOMER_MYORDERS_REQUEST,
    })

    const url = request_url + '/seller/alluserorders'
    console.log(`in get seller max sale productss`)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: SELLER_ALL_CUSTOMER_MYORDERS_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: SELLER_ALL_CUSTOMER_MYORDERS_FAIL,
          payload: error,
        })
      })
  }
}