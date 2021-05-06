import axios from 'axios'
import { request_url } from '../config/url'
import {
  PAYEMENT_FETCH_REQUEST,
  PAYEMENT_FETCH_SUCCESS,
  PAYEMENT_FETCH_FAIL,
  RATING_FETCH_REQUEST,
  RATING_FETCH_SUCCESS,
  RATING_FETCH_FAIL,
  MAX_SALE_PRODUCT_FETCH_REQUEST,
  MAX_SALE_PRODUCT_FETCH_SUCCESS,
  MAX_SALE_PRODUCT_FETCH_FAIL,
  MONTHWISE_REVENUE_FETCH_REQUEST,
  MONTHWISE_REVENUE_FETCH_SUCCESS,
  MONTHWISE_REVENUE_FETCH_FAIL,
} from '../constants/adminDashBoardConstant'

export const getPayment = () => {
  return (dispatch) => {
    dispatch({
      type: PAYEMENT_FETCH_REQUEST,
    })

    console.log('in get payment')

    const url = request_url + '/payment/total'

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
          type: PAYEMENT_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PAYEMENT_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

//getting rating action

export const getRating = () => {
  return (dispatch) => {
    dispatch({
      type: RATING_FETCH_REQUEST,
    })

    console.log('in get payment')

    const url = request_url + '/rating'

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
          type: RATING_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: RATING_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

//getting maximum sell product

export const getMaxSalesProduct = () => {
  return (dispatch) => {
    dispatch({
      type: MAX_SALE_PRODUCT_FETCH_REQUEST,
    })

    console.log('getmax salesProduct')

    const url = request_url + '/max/product/sales'

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
          type: MAX_SALE_PRODUCT_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: MAX_SALE_PRODUCT_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

//getting maximum sell product

export const getMonthWiseRevenue = () => {
  return (dispatch) => {
    dispatch({
      type: MONTHWISE_REVENUE_FETCH_REQUEST,
    })

    console.log('getmax salesProduct')

    const url = request_url + '/month/revenue'

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
          type: MONTHWISE_REVENUE_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: MONTHWISE_REVENUE_FETCH_FAIL,
          payload: error,
        })
      })
  }
}
