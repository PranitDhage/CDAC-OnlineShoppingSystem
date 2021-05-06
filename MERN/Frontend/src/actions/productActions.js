import axios from 'axios'
import { request_url } from '../config/url'
import {
  CATEGORY_FETCH_FAIL,
  CATEGORY_FETCH_REQUEST,
  CATEGORY_FETCH_SUCCESS,
  COMPANY_FETCH_FAIL,
  COMPANY_FETCH_REQUEST,
  COMPANY_FETCH_SUCCESS,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAIL,
  PRODUCT_POST_REQUEST,
  PRODUCT_POST_FAIL,
  PRODUCT_POST_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_RATING_FETCH_REQUEST,
  PRODUCT_RATING_FETCH_SUCCESS,
  PRODUCT_RATING_FETCH_FAIL,
  PRODUCT_COMMENT_FETCH_FAIL,
  PRODUCT_COMMENT_FETCH_SUCCESS,
  PRODUCT_COMMENT_FETCH_REQUEST,
} from './../constants/productConstants'

export const getProductList = () => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_FETCH_REQUEST,
    })

    const url = request_url + '/product'

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

export const addProduct = (
  prod_title,
  prod_description,
  cat_id,
  prod_price,
  comp_id,
  prod_qty,
  photo
) => {
  return (dispatch) => {
    const formData = new FormData()

    formData.append('prod_title', prod_title)
    formData.append('prod_description', prod_description)
    formData.append('cat_id', cat_id)
    formData.append('prod_price', prod_price)
    formData.append('comp_id', comp_id)
    formData.append('prod_qty', prod_qty)
    formData.append('photo', photo)

    dispatch({
      type: PRODUCT_POST_REQUEST,
    })

    const url = request_url + '/addproduct'

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
          type: PRODUCT_POST_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_POST_FAIL,
          payload: error,
        })
      })
  }
}

// Rate Product
export const rateProduct = (orderdetails_id, rating, comment) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    })

    const url = request_url + '/rateProduct'

    const body = {
      orderdetails_id,
      rating,
      comment,
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

export const getAllCategories = () => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_FETCH_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/category/'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: CATEGORY_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

export const getAllCompanies = () => {
  return (dispatch) => {
    dispatch({
      type: COMPANY_FETCH_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    const url = request_url + '/company/'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: COMPANY_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: COMPANY_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

export const getProductDetails = (prod_id) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_FETCH_REQUEST,
    })

    const url = request_url + `/productdetails/${prod_id}`
    console.log(url)
    const header = {
      'Content-Type': 'application/json',
      token: sessionStorage['token'],
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

export const getProductRatings = (prod_id) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_RATING_FETCH_REQUEST,
    })

    const url = request_url + `/productRatingAvg/${prod_id}`

    console.log(url)
    const header = {
      'Content-Type': 'application/json',
      token: sessionStorage['token'],
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_RATING_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_RATING_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

export const getProductComments = (prod_id) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_COMMENT_FETCH_REQUEST,
    })

    const url = request_url + `/productComment/${prod_id}`

    console.log(url)
    const header = {
      'Content-Type': 'application/json',
      token: sessionStorage['token'],
    }

    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_COMMENT_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_COMMENT_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

//delete seller product
export const deleteProduct = (prod_id) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    })

    const url = request_url + `/product/${prod_id}`
    console.log(url)
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    axios
      .delete(url, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_DELETE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_DELETE_FAIL,
          payload: error,
        })
      })
  }
}
