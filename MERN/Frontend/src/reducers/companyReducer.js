import {
  COMPANY_ADD_REQUEST,
  COMPANY_ADD_SUCCESS,
  COMPANY_ADD_FAIL,
  COMPANY_ADD_RESET,
  COMPANY_FETCH_REQUEST,
  COMPANY_FETCH_SUCCESS,
  COMPANY_FETCH_FAIL,
  COMPANY_FETCH_RESET,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
  COMPANY_UPDATE_RESET,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAIL,
  COMPANY_DELETE_RESET,
} from '../constants/productConstants'

export const getCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_FETCH_REQUEST:
      return { loading: true }

    case COMPANY_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case COMPANY_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case COMPANY_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const addCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_ADD_REQUEST:
      return { loading: true }

    case COMPANY_ADD_SUCCESS:
      return { loading: false, response: action.payload }

    case COMPANY_ADD_FAIL:
      return { loading: false, error: action.payload }

    case COMPANY_ADD_RESET:
      return {}

    default:
      return state
  }
}

export const updateCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_UPDATE_REQUEST:
      return { loading: true }

    case COMPANY_UPDATE_SUCCESS:
      return { loading: false, response: action.payload }

    case COMPANY_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case COMPANY_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const deleteCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_DELETE_REQUEST:
      return { loading: true }

    case COMPANY_DELETE_SUCCESS:
      return { loading: false, response: action.payload }

    case COMPANY_DELETE_FAIL:
      return { loading: false, error: action.payload }

    case COMPANY_DELETE_RESET:
      return {}

    default:
      return state
  }
}
