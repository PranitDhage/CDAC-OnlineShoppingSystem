import {
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_RESET,
  CART_ADD_SUCCESS,
  CART_FETCH_FAIL,
  CART_FETCH_REQUEST,
  CART_FETCH_RESET,
  CART_FETCH_SUCCESS,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_RESET,
  CART_FETCH_REQUEST_AT_LOGIN,
  CART_FETCH_SUCCESS_AT_LOGIN,
  CART_FETCH_FAIL_AT_LOGIN,
  CART_FETCH_RESET_AT_LOGIN,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_RESET,
  CART_CHECKOUT_REQUEST,
  CART_CHECKOUT_SUCCESS,
  CART_CHECKOUT_FAIL,
  CART_CHECKOUT_RESET,
} from '../constants/cartConstants'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true }

    case CART_ADD_SUCCESS:
      return { loading: false, response: action.payload }

    case CART_ADD_FAIL:
      return { loading: false, error: action.payload }

    case CART_ADD_RESET:
      return {}

    default:
      return state
  }
}

export const cartRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_REMOVE_REQUEST:
      return { loading: true }

    case CART_REMOVE_SUCCESS:
      return { loading: false, response: action.payload }

    case CART_REMOVE_FAIL:
      return { loading: false, error: action.payload }

    case CART_REMOVE_RESET:
      return {}

    default:
      return state
  }
}

export const cartFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_FETCH_REQUEST:
      return { loading: true }

    case CART_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case CART_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case CART_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const updateCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return { loading: true }

    case CART_UPDATE_SUCCESS:
      return { loading: false, response: action.payload }

    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case CART_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const cartFetchAtLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_FETCH_REQUEST_AT_LOGIN:
      return { loading: true }

    case CART_FETCH_SUCCESS_AT_LOGIN:
      return { loading: false, response: action.payload }

    case CART_FETCH_FAIL_AT_LOGIN:
      return { loading: false, error: action.payload }

    case CART_FETCH_RESET_AT_LOGIN:
      return {}

    default:
      return state
  }
}

export const cartCheckoutReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_CHECKOUT_REQUEST:
      return { loading: true }

    case CART_CHECKOUT_SUCCESS:
      return { loading: false, response: action.payload }

    case CART_CHECKOUT_FAIL:
      return { loading: false, error: action.payload }

    case CART_CHECKOUT_RESET:
      return {}

    default:
      return state
  }
}
