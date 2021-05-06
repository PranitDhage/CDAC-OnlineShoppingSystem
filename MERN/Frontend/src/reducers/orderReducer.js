import {
	ORDERDETAILS_FETCH_REQUEST,
	ORDERDETAILS_FETCH_SUCCESS,
	ORDERDETAILS_FETCH_FAIL,
	ORDERDETAILS_FETCH_RESET
} from '../constants/orderConstants';

export const viewOrderDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDERDETAILS_FETCH_REQUEST:
			return { loading: true };

		case ORDERDETAILS_FETCH_SUCCESS:
			return { loading: false, response: action.payload };

		case ORDERDETAILS_FETCH_FAIL:
			return { loading: false, error: action.payload };

		case ORDERDETAILS_FETCH_RESET:
			return {};

		default:
			return state;
	}
};
