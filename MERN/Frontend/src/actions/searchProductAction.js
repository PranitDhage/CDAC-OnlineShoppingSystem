
import axios from 'axios'
import { request_url } from '../config/url'

import {
SEARCH_PRODUCT_FETCH_FAIL,
SEARCH_PRODUCT_FETCH_REQUEST,
SEARCH_PRODUCT_FETCH_SUCCESS,
SEARCH_PRODUCT_FETCH_RESET
  } from './../constants/searchConstants'


  
export const getProductListBySearch = (product_name) => {
    return (dispatch) => {
      dispatch({
        type: SEARCH_PRODUCT_FETCH_REQUEST,
      })
  
      const url = 'http://localhost:4000/search/product'
  
      console.log(`in action of getProductListBySearch`)

      const header = {
        headers: {
          'Content-Type': 'application/json',
          token: sessionStorage['token'],
        },
      }
     
      const body = {
        product_name
      }

      axios
        .post(url, body,header)
        .then((response) => {
          dispatch({
            type: SEARCH_PRODUCT_FETCH_SUCCESS,
            payload: response.data,
          })
        })
        .catch((error) => {
          dispatch({
            type: SEARCH_PRODUCT_FETCH_FAIL,
            payload: error,
          })
        })
    }
  }
  