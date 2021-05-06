import {
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_ADD_RESET,
  CATEGORY_FETCH_REQUEST,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,
  CATEGORY_FETCH_RESET,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_RESET,
} from '../constants/productConstants'

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_REQUEST:
      return { loading: true }

    case CATEGORY_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case CATEGORY_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case CATEGORY_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading: true }

    case CATEGORY_ADD_SUCCESS:
      return { loading: false, response: action.payload }

    case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload }

    case CATEGORY_ADD_RESET:
      return {}

    default:
      return state
  }
}

export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true }

    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, response: action.payload }

    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case CATEGORY_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }

    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, response: action.payload }

    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }

    case CATEGORY_DELETE_RESET:
      return {}

    default:
      return state
  }
}
