import {
  ADD_ADDRESS_FAIL,
  ADD_ADDRESS_REQUEST,
  ADD_ADDRESS_RESET,
  ADD_ADDRESS_SUCCESS,
  FETCH_ADDRESS_FAIL,
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_RESET,
  FETCH_ADDRESS_SUCCESS,
} from '../constants/addressConstants'

export const addAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADDRESS_REQUEST:
      return { loading: true }

    case ADD_ADDRESS_SUCCESS:
      return { loading: false, response: action.payload }

    case ADD_ADDRESS_FAIL:
      return { loading: false, error: action.payload }

    case ADD_ADDRESS_RESET:
      return {}

    default:
      return state
  }
}

export const fetchAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADDRESS_REQUEST:
      return { loading: true }

    case FETCH_ADDRESS_SUCCESS:
      return { loading: false, response: action.payload }

    case FETCH_ADDRESS_FAIL:
      return { loading: false, error: action.payload }

    case FETCH_ADDRESS_RESET:
      return {}

    default:
      return state
  }
}
