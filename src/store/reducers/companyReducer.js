import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  allCompany: [], 
};

//GET_ALL_COMPANY
const getAllCompanyPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    allCompany: [] 
  })
}

const getAllCompanySuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    allCompany: action.data,
	});
}

const getAllCompanyFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
} 

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_COMPANY.PENDING: return getAllCompanyPending(state, action);
    case actionTypes.GET_ALL_COMPANY.SUCCESS: return getAllCompanySuccess(state, action);
    case actionTypes.GET_ALL_COMPANY.FAIL: return getAllCompanyFail(state, action);  

		default: return state;
	}
};

export default reducer;