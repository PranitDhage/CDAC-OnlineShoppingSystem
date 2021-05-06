import {
  PAYEMENT_FETCH_REQUEST,
  PAYEMENT_FETCH_SUCCESS,
  PAYEMENT_FETCH_FAIL,
  PAYEMENT_FETCH_RESET,
  DATA_FETCH_REQUEST,
  DATA_FETCH_SUCCESS,
  DATA_FETCH_FAIL,
  DATA_FETCH_RESET,
  RATING_FETCH_REQUEST,
  RATING_FETCH_SUCCESS,
  RATING_FETCH_FAIL,
  RATING_FETCH_RESET,
  MAX_SALE_PRODUCT_FETCH_REQUEST,
  MAX_SALE_PRODUCT_FETCH_SUCCESS,
  MAX_SALE_PRODUCT_FETCH_FAIL,
  MAX_SALE_PRODUCT_FETCH_RESET,
  MONTHWISE_REVENUE_FETCH_REQUEST,
  MONTHWISE_REVENUE_FETCH_SUCCESS,
  MONTHWISE_REVENUE_FETCH_FAIL,
  MONTHWISE_REVENUE_FETCH_RESET,
} from '../constants/adminDashBoardConstant'

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYEMENT_FETCH_REQUEST:
      return { loading: true }

    case PAYEMENT_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case PAYEMENT_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case PAYEMENT_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const ratingReducer = (state = {}, action) => {
  switch (action.type) {
    case RATING_FETCH_REQUEST:
      return { loading: true }

    case RATING_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case RATING_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case RATING_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case DATA_FETCH_REQUEST:
      return { loading: true }

    case DATA_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case DATA_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case DATA_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const maxSaleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case MAX_SALE_PRODUCT_FETCH_REQUEST:
      return { loading: true }

    case MAX_SALE_PRODUCT_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case MAX_SALE_PRODUCT_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case MAX_SALE_PRODUCT_FETCH_RESET:
      return {}

    default:
      return state
  }
}

//month wise revenu

export const monthWiseRevenueReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHWISE_REVENUE_FETCH_REQUEST:
      return { loading: true }

    case MONTHWISE_REVENUE_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case MONTHWISE_REVENUE_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case MONTHWISE_REVENUE_FETCH_RESET:
      return {}

    default:
      return state
  }
}
