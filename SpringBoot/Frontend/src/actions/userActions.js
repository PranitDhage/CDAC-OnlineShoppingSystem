import axios from 'axios'
import { useHistory } from 'react-router'
import { request_url } from '../config/url'
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  USER_APPROVE_REQUEST,
  USER_APPROVE_SUCCESS,
  USER_APPROVE_FAIL,
  USER_SUSPEND_SUCCESS,
  USER_SUSPEND_REQUEST,
  USER_SUSPEND_FAIL,
} from '../constants/userConstants'
import { USER_SIGNUP_FAIL } from './../constants/userConstants'

export const logout = () => {
  return (dispatch) => {
    const history = useHistory();
    sessionStorage.removeItem('token')
    dispatch({ type: USER_SIGNOUT })
    history.push('/');
  }
}

export const signup = (email, password, name, phone) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const url = request_url + '/user/signup'

    const body = {
      email,
      password,
      name,
      phone,
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error,
        })
      })
  }
}

export const signin = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    })

    const url = request_url + '/authenticate'

    const body = {
      username,
      password,
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error,
        })
      })
  }
}

export const editprofile = (password, name, phone) => {
  return (dispatch) => {
    dispatch({
      type: USER_PROFILE_REQUEST,
    })

    const url = request_url + '/user/edit'

    const body = {
      password,
      name,
      phone,
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    console.log(sessionStorage['token'])

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_PROFILE_FAIL,
          payload: error,
        })
      })
  }
}

//get all user
export const getAllUsers = () => {
  return (dispatch) => {
    dispatch({
      type: USER_FETCH_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    const url = request_url + '/user/list/users'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: USER_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

// approve or suspend
export const changeUserStatus = (user_id,status) => {
  return (dispatch) => {
    dispatch({
      type: USER_APPROVE_REQUEST,
    })

    const url = request_url + '/user/action/approve-suspend'

    const body = {
      user_id,
      status,
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    console.log(sessionStorage['token'])
    
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_APPROVE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_APPROVE_FAIL,
          payload: error,
        })
      })
  }
}

//get seller , approve seller , suspend seller

//get all user

export const getAllSellers = () => {
  return (dispatch) => {
    dispatch({
      type: USER_FETCH_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    const url = request_url + '/user/list/sellers'
    axios
      .get(url, header)
      .then((response) => {
        dispatch({
          type: USER_FETCH_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_FETCH_FAIL,
          payload: error,
        })
      })
  }
}

export const approveSeller = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: USER_APPROVE_REQUEST,
    })

    const url = request_url + '/user/action/role-change'

    const body = {
      user_id,
      role:"SELLER",
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    console.log(sessionStorage['token'])

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_APPROVE_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_APPROVE_FAIL,
          payload: error,
        })
      })
  }
}

export const suspendSelller = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: USER_SUSPEND_REQUEST,
    })

    const url = request_url + '/user/action/role-change'

    const body = {
      user_id,
      role:"CUSTOMER",
    }

    const header = {
      headers: {
        'Content-Type': 'application/json',
        Authorization:'Bearer ' + sessionStorage['token'],
      },
    }

    console.log(sessionStorage['token'])
    
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SUSPEND_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SUSPEND_FAIL,
          payload: error,
        })
      })
  }
}
