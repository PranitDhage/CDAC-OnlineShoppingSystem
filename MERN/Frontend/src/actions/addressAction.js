import axios from "axios";
import { request_url } from "../config/url";
import { ADD_ADDRESS_FAIL, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, FETCH_ADDRESS_FAIL, FETCH_ADDRESS_REQUEST, FETCH_ADDRESS_SUCCESS } from "../constants/addressConstants";

export const addAddress = (address, city, state, country, pin) => {
    return (dispatch) => {
        dispatch({
            type: ADD_ADDRESS_REQUEST,
        })

        const url = request_url + '/address'

        const body = {
            address,
            city,
            state,
            country,
            pin
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
                    type: ADD_ADDRESS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: ADD_ADDRESS_FAIL,
                    payload: error,
                })
            })
    };
};

export const fetchAddress = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ADDRESS_REQUEST,
        })

        const url = request_url + '/address'

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
                    type: FETCH_ADDRESS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_ADDRESS_FAIL,
                    payload: error,
                })
            })
    };
};

export const fetchUserAddresses = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ADDRESS_REQUEST,
        })

        const url = request_url + '/address'

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
                    type: FETCH_ADDRESS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_ADDRESS_FAIL,
                    payload: error,
                })
            })
    };
};

export const fetchAddressForOrderDetails = (add_id) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ADDRESS_REQUEST,
        })

        const url = request_url + `/address/${add_id}`

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
                    type: FETCH_ADDRESS_SUCCESS,
                    payload: response.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_ADDRESS_FAIL,
                    payload: error,
                })
            })
    };
};
