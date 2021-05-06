import{
     SEARCH_PRODUCT_FETCH_REQUEST ,
 SEARCH_PRODUCT_FETCH_SUCCESS ,
 SEARCH_PRODUCT_FETCH_FAIL ,
 SEARCH_PRODUCT_FETCH_RESET,
}
from './../constants/searchConstants'

export const searchProductReducer = (state = {}, action) => {
    switch (action.type) {
      case SEARCH_PRODUCT_FETCH_REQUEST:
        return { loading: true }
  
      case SEARCH_PRODUCT_FETCH_SUCCESS:
        return { loading: false, response: action.payload }
  
      case SEARCH_PRODUCT_FETCH_FAIL:
        return { loading: false, error: action.payload }
  
      case SEARCH_PRODUCT_FETCH_RESET:
        return {}
  
      default:
        return state
    }
  }
  