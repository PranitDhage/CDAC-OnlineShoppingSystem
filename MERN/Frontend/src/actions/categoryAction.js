import axios from 'axios'
import { request_url } from '../config/url'
import {
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,

  CATEGORY_FETCH_REQUEST,
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_FAIL,

  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,

  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,

} from './../constants/productConstants'

export const getCategory = () => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_FETCH_REQUEST,
    })

    const url = request_url + '/category';

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

export const addCategory = (cat_title, cat_description) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_ADD_REQUEST,
    })

    const url = request_url + '/category';

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }
    const body = {
      cat_title,
      cat_description,
    }

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: CATEGORY_ADD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_ADD_FAIL,
          payload: error,
        })
      })
  }
}

export const updateCategory = (cat_id, cat_title, cat_description) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
    })

    const url = request_url + '/category';
    const body = {
      cat_id,
      cat_title,
      cat_description,
    }
    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }

    console.log(`body.cat_id ${body.cat_id}`)

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: CATEGORY_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}

export const deleteCategory = (cat_id) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
    })

    const url = request_url + `/category /${cat_id}`

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
          type: CATEGORY_DELETE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: CATEGORY_DELETE_FAIL,
          payload: error,
        })
      })
  }
}
