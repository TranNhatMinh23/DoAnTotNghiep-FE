import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listUserStatistical: [],
  detailStatisticalOfUser: null
};

//GET_STATISTICALS
const getStatisticalPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listUserStatistical: [] 
  })
}

const getStatisticalSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listUserStatistical: action.data,
	});
}

const getStatisticalFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
} 

//GET_DETAIL_STATISTICAL_OF_USER
const getDetailStatisticalOfUserPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailStatisticalOfUser: null
  })
}

const getDetailStatisticalOfUserSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailStatisticalOfUser: action.data,
	});
}

const getDetailStatisticalOfUserFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
} 

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_STATISTICALS.PENDING: return getStatisticalPending(state, action);
    case actionTypes.GET_STATISTICALS.SUCCESS: return getStatisticalSuccess(state, action);
    case actionTypes.GET_STATISTICALS.FAIL: return getStatisticalFail(state, action); 

    case actionTypes.GET_DETAIL_STATISTICAL_OF_USER.PENDING: return getDetailStatisticalOfUserPending(state, action);
    case actionTypes.GET_DETAIL_STATISTICAL_OF_USER.SUCCESS: return getDetailStatisticalOfUserSuccess(state, action);
    case actionTypes.GET_DETAIL_STATISTICAL_OF_USER.FAIL: return getDetailStatisticalOfUserFail(state, action); 

		default: return state;
	}
};

export default reducer;