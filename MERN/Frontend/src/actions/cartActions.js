import axios from 'axios'
import { request_url } from '../config/url'
import {
  CART_FETCH_REQUEST,
  CART_FETCH_SUCCESS,
  CART_FETCH_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_FETCH_REQUEST_AT_LOGIN,
  CART_FETCH_SUCCESS_AT_LOGIN,
  CART_FETCH_FAIL_AT_LOGIN,
  CART_CHECKOUT_REQUEST,
  CART_CHECKOUT_SUCCESS,
  CART_CHECKOUT_FAIL,
} from './../constants/cartConstants'

export const addToCart = (prod_id, cart_quantity) => {
  return (dispatch) => {
    dispatch({
      type: CART_ADD_REQUEST,
    })

    console.log('in add to cart')
    console.log(prod_id + ' token: ' + sessionStorage['token'])

    const url = request_url + '/addtocart'

    const body = {
      prod_id,
      cart_quantity,
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: CART_ADD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_ADD_FAIL,
          payload: error,
        })
      })
  }
}

export const getAllCartItems = () => {
  return (dispatch) => {
    dispatch({
      type: CART_FETCH_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/cart/'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: CART_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

export const removeFromCart = (cart_id) => {
  return (dispatch) => {
    dispatch({
      type: CART_REMOVE_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + `/cart/${cart_id}`

    axios
      .delete(url, header)
      .then((response) => {
        dispatch({
          type: CART_REMOVE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_REMOVE_FAIL,
          payload: error,
        })
      })
  }
}

export const updateCart = (cart_id, cart_quantity) => {
  return (dispatch) => {
    dispatch({
      type: CART_UPDATE_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/cart'

    const body = {
      cart_id,
      cart_quantity,
    }

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: CART_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}

export const getAllCartItemsAtLogin = () => {
  return (dispatch) => {
    dispatch({
      type: CART_FETCH_REQUEST_AT_LOGIN,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/cart/'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: CART_FETCH_SUCCESS_AT_LOGIN,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_FETCH_FAIL_AT_LOGIN,
          payload: error,
        })
      })
  }
}

export const cartCheckout = (add_id) => {
  return (dispatch) => {
    dispatch({
      type: CART_CHECKOUT_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/user/checkout'

    const body = {
      add_id
    }

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: CART_CHECKOUT_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CART_CHECKOUT_FAIL,
          payload: error,
        })
      })
  }
}
