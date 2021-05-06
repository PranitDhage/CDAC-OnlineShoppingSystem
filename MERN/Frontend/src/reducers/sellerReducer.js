import {
  SELLER_APPLY_REQUEST,
  SELLER_APPLY_SUCCESS,
  SELLER_APPLY_FAIL,
  SELLER_APPLY_RESET,
} from './../constants/userConstants'

import {
  SELLER_MAX_SELLING_PROD_REQUEST,
  SELLER_MAX_SELLING_PROD_SUCCESS,
  SELLER_MAX_SELLING_PROD_FAIL,
  SELLER_MAX_SELLING_PROD_RESET,
  SELLER_TOTAL_REVENUE_REQUEST,
  SELLER_TOTAL_REVENUE_SUCCESS,
  SELLER_TOTAL_REVENUE_FAIL,
  SELLER_TOTAL_REVENUE_RESET,
  SELLER_CUST_RATING_REQUEST,
  SELLER_CUST_RATING_SUCCESS,
  SELLER_CUST_RATING_FAIL,
  SELLER_CUST_RATING_RESET,
  SELLER_MONTHLY_REVENUE_REQUEST,
  SELLER_MONTHLY_REVENUE_SUCCESS,
  SELLER_MONTHLY_REVENUE_FAIL,
  SELLER_MONTHLY_REVENUE_RESET,
  SELLER_ALL_CUSTOMER_MYORDERS_REQUEST,
  SELLER_ALL_CUSTOMER_MYORDERS_SUCCESS,
  SELLER_ALL_CUSTOMER_MYORDERS_FAIL,
  SELLER_ALL_CUSTOMER_MYORDERS_RESET,
} from './../constants/sellerConstants'

export const sellerApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_APPLY_REQUEST:
      return { loading: true }

    case SELLER_APPLY_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_APPLY_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_APPLY_RESET:
      return {}

    default:
      return state
  }
}

export const gettingSellerMaxProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_MAX_SELLING_PROD_REQUEST:
      return { loading: true }

    case SELLER_MAX_SELLING_PROD_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_MAX_SELLING_PROD_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_MAX_SELLING_PROD_RESET:
      return {}

    default:
      return state
  }
}

export const getSellerTotalRevenue = (state = {}, action) => {
  switch (action.type) {
    case SELLER_TOTAL_REVENUE_REQUEST:
      return { loading: true }

    case SELLER_TOTAL_REVENUE_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_TOTAL_REVENUE_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_TOTAL_REVENUE_RESET:
      return {}

    default:
      return state
  }
}

export const getSellerCustAvgRating = (state = {}, action) => {
  switch (action.type) {
    case SELLER_CUST_RATING_REQUEST:
      return { loading: true }

    case SELLER_CUST_RATING_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_CUST_RATING_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_CUST_RATING_RESET:
      return {}

    default:
      return state
  }
}

export const getSellerMontlyRevenueReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_MONTHLY_REVENUE_REQUEST:
      return { loading: true }

    case SELLER_MONTHLY_REVENUE_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_MONTHLY_REVENUE_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_MONTHLY_REVENUE_RESET:
      return {}

    default:
      return state
  }
}

export const getAllCustomersMyOrderForSellerReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_ALL_CUSTOMER_MYORDERS_REQUEST:
      return { loading: true }

    case SELLER_ALL_CUSTOMER_MYORDERS_SUCCESS:
      return { loading: false, response: action.payload }

    case SELLER_ALL_CUSTOMER_MYORDERS_FAIL:
      return { loading: false, error: action.payload }

    case SELLER_ALL_CUSTOMER_MYORDERS_RESET:
      return {}

    default:
      return state
  }
}
