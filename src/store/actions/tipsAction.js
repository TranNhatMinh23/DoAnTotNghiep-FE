import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api'; 
import { 
  getAllTipsFailMessage,
  getDetailTipFailMessage
} from '../../constants/messageResponseClient';

//GET_ALL_TIPS
const getAllTipsSuccess = (data) => ({
  type: actionTypes.GET_ALL_TIPS.SUCCESS,
  data,
})

const getAllTipsFail = (err) => ({
  type: actionTypes.GET_ALL_TIPS.FAIL,
  err,
})

export const getAllTips = (page = 1) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_TIPS.PENDING });
    axios.get(`/api/tips?page=${page}`)
      .then((response) => {
        dispatch(getAllTipsSuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllTipsFail(getAllTipsFailMessage));
      });
  };
}

//GET_DETAIL_TIP
const getDetailTipSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_TIP.SUCCESS,
  data,
})

const getDetailTipFail = (err) => ({
  type: actionTypes.GET_DETAIL_TIP.FAIL,
  err,
})

export const getDetailTip = (tipId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DETAIL_TIP.PENDING });
    axios.get(`/api/tips/${tipId}`)
      .then((response) => {
        dispatch(getDetailTipSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDetailTipFail(getDetailTipFailMessage));
      });
  };
}