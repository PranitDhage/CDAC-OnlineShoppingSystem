import axios from 'axios'
import { request_url } from '../config/url';
import {
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_FETCH_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from './../constants/productConstants'

// Get All Product Details For Admin
export const getProductListAdmin = () => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_FETCH_REQUEST,
    })

    const url = request_url + '/admin/product'

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
  };
};

//Update Admin product
export const updateProduct = (
  prod_id,
  prod_title,
  prod_price,
  prod_qty
) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const url = request_url + '/product/update';
    console.log(` update product --.>prod_id--->${prod_id} prod_title--->${prod_title}  prod_price--->${prod_price} prod_qty--->${prod_qty}`)
    const body = {
      prod_id,
      prod_title,
      prod_price,
      prod_qty,
    };
    const header = {
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage["token"],
      }
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: PRODUCT_UPDATE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_UPDATE_FAIL,
          payload: error,
        });
      });
  };
};
