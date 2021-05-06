import axios from 'axios';
import { request_url } from '../config/url';
import {
	MYORDER_FETCH_REQUEST,
	MYORDER_FETCH_SUCCESS,
	MYORDER_FETCH_FAIL,
	MYORDER_UPDATE_REQUEST,
	MYORDER_UPDATE_SUCCESS,
	MYORDER_UPDATE_FAIL
} from './../constants/myorderConstants';

export const getMyOrderList = () => {
	return (dispatch) => {
		dispatch({
			type: MYORDER_FETCH_REQUEST
		});

		const url = request_url + '/myorder';

		const header = {
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage['token']
			}
		};

		axios
			.get(url, header)
			.then((response) => {
				dispatch({
					type: MYORDER_FETCH_SUCCESS,
					payload: response.data
				});
			})
			.catch((error) => {
				dispatch({
					type: MYORDER_FETCH_FAIL,
					payload: error
				});
			});
	};
};

export const updateMyOrder = (myorder_id, status) => {
	return (dispatch) => {
		dispatch({
			type: MYORDER_UPDATE_REQUEST
		});

		const url = request_url + '/updateMyorder';

		const body = {
			myorder_id,
			status
		};
		const header = {
			headers: {
				'Content-Type': 'application/json',
				token: sessionStorage['token']
			}
		};

		axios
			.put(url, body, header)
			.then((response) => {
				dispatch({
					type: MYORDER_UPDATE_SUCCESS,
					payload: response.data
				});
			})
			.catch((error) => {
				dispatch({
					type: MYORDER_UPDATE_FAIL,
					payload: error
				});
			});
	};
};
