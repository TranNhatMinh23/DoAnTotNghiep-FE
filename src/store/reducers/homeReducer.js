import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	isLoading: false,
	err: false,
	message: '',
	mainInfo: null
};

//GET_ALL_MAIN_INFO
const getAllMainInfoPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		mainInfo: null
	});
}

const getAllMainInfoSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		mainInfo: action.data
	});
}

const getAllMainInfoFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_MAIN_INFO.PENDING: return getAllMainInfoPendding(state, action);
		case actionTypes.GET_ALL_MAIN_INFO.SUCCESS: return getAllMainInfoSuccess(state, action);
		case actionTypes.GET_ALL_MAIN_INFO.FAIL: return getAllMainInfoFail(state, action); 

		default: return state;
	}
};

export default reducer;