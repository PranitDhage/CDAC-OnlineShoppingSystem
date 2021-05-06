import {
	MYORDER_FETCH_REQUEST,
	MYORDER_FETCH_SUCCESS,
	MYORDER_FETCH_FAIL,
	MYORDER_UPDATE_REQUEST,
	MYORDER_UPDATE_SUCCESS,
	MYORDER_UPDATE_FAIL,
	MYORDER_UPDATE_RESET,
	MYORDER_FETCH_RESET
} from './../constants/myorderConstants';

export const getMyorderReducer = (state = {}, action) => {
	switch (action.type) {
		case MYORDER_FETCH_REQUEST:
			return { loading: true };

		case MYORDER_FETCH_SUCCESS:
			return { loading: false, response: action.payload };

		case MYORDER_FETCH_FAIL:
			return { loading: false, error: action.payload };

		case MYORDER_FETCH_RESET:
			return {};

		default:
			return state;
	}
};

export const updateMyorderReducer = (state = {}, action) => {
	switch (action.type) {
		case MYORDER_UPDATE_REQUEST:
			return { loading: true };

		case MYORDER_UPDATE_SUCCESS:
			return { loading: false, response: action.payload };

		case MYORDER_UPDATE_FAIL:
			return { loading: false, error: action.payload };

		case MYORDER_UPDATE_RESET:
			return {};

		default:
			return state;
	}
};
