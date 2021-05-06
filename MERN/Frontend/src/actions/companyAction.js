import axios from 'axios'
import { request_url } from '../config/url'
import {
  COMPANY_ADD_REQUEST,
  COMPANY_ADD_SUCCESS,
  COMPANY_ADD_FAIL,
  COMPANY_FETCH_REQUEST,
  COMPANY_FETCH_SUCCESS,
  COMPANY_FETCH_FAIL,
  COMPANY_UPDATE_REQUEST,
  COMPANY_UPDATE_SUCCESS,
  COMPANY_UPDATE_FAIL,
  COMPANY_DELETE_REQUEST,
  COMPANY_DELETE_SUCCESS,
  COMPANY_DELETE_FAIL,
} from './../constants/productConstants'

export const getCompany = () => {
  return (dispatch) => {
    dispatch({
      type: COMPANY_FETCH_REQUEST,
    })

    const url = request_url + '/company'

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

export const addCompany = (comp_title, comp_description) => {
  return (dispatch) => {
    dispatch({
      type: COMPANY_ADD_REQUEST,
    })

    const url = request_url + '/company'

    const header = {
      headers: {
        'Content-Type': 'application/json',
        token: sessionStorage['token'],
      },
    }
    const body = {
      comp_title,
      comp_description,
    }
    console.log(
      `in add company action ${body.comp_title}  ${body.comp_description}`
    )
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: COMPANY_ADD_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: COMPANY_ADD_FAIL,
          payload: error,
        })
      })
  }
}

//update company
export const updateCompany = (comp_id, comp_title, comp_description) => {
  return (dispatch) => {
    dispatch({
      type: COMPANY_UPDATE_REQUEST,
    })
    console.log(`in update action`)
    const url = request_url + '/company/update'
    const body = {
      comp_id,
      comp_title,
      comp_description,
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
          type: COMPANY_UPDATE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: COMPANY_UPDATE_FAIL,
          payload: error,
        })
      })
  }
}

export const deleteCompany = (comp_id) => {
  return (dispatch) => {
    dispatch({
      type: COMPANY_DELETE_REQUEST,
    })

    const url = request_url + `/company/${comp_id}`

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
          type: COMPANY_DELETE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: COMPANY_DELETE_FAIL,
          payload: error,
        })
      })
  }
}
