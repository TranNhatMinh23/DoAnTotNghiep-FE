import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listTips: null,
  detailTip: null,
  releatedTips: []
};

//GET_ALL_TIPS
const getAllTipsPendding = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listTips: null
  });
}

const getAllTipsSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false, 
	  listTips: action.data
  });
}

const getAllTipsFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//GET_DETAIL_TIP
const getDetailTipPendding = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailTip: null,
    releatedTips: []
  });
}

const getDetailTipSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false, 
    detailTip: action.data.detail,
    releatedTips: action.data.related
  });
}

const getDetailTipFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TIPS.PENDING: return getAllTipsPendding(state, action);
    case actionTypes.GET_ALL_TIPS.SUCCESS: return getAllTipsSuccess(state, action);
    case actionTypes.GET_ALL_TIPS.FAIL: return getAllTipsFail(state, action);

    case actionTypes.GET_DETAIL_TIP.PENDING: return getDetailTipPendding(state, action);
    case actionTypes.GET_DETAIL_TIP.SUCCESS: return getDetailTipSuccess(state, action);
    case actionTypes.GET_DETAIL_TIP.FAIL: return getDetailTipFail(state, action);

    default: return state;
  }
};

export default reducer;