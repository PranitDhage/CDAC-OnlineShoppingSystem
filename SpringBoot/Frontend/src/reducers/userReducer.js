import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_SIGNUP_RESET,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAIL,
  USER_FETCH_RESET,
  USER_APPROVE_REQUEST,
  USER_APPROVE_SUCCESS,
  USER_APPROVE_FAIL,
  USER_APPROVE_RESET,
  USER_SUSPEND_SUCCESS,
  USER_SUSPEND_REQUEST,
  USER_SUSPEND_FAIL,
  USER_SUSPEND_RESET,
} from './../constants/userConstants'

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true }

    case USER_SIGNUP_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload }

    case USER_SIGNUP_RESET:
      return {}

    default:
      return state
  }
}

export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true }

    case USER_SIGNIN_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload }

    case USER_SIGNOUT:
      return {}

    default:
      return state
  }
}

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true }

    case USER_PROFILE_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload }

    case USER_PROFILE_RESET:
      return {}

    default:
      return state
  }
}

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FETCH_REQUEST:
      return { loading: true }

    case USER_FETCH_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_FETCH_FAIL:
      return { loading: false, error: action.payload }

    case USER_FETCH_RESET:
      return {}

    default:
      return state
  }
}

export const userApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_APPROVE_REQUEST:
      return { loading: true }

    case USER_APPROVE_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_APPROVE_FAIL:
      return { loading: false, error: action.payload }

    case USER_APPROVE_RESET:
      return {}

    default:
      return state
  }
}

export const userSuspendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SUSPEND_REQUEST:
      return { loading: true }

    case USER_SUSPEND_SUCCESS:
      return { loading: false, response: action.payload }

    case USER_SUSPEND_FAIL:
      return { loading: false, error: action.payload }

    case USER_SUSPEND_RESET:
      return {}

    default:
      return state
  }
}
