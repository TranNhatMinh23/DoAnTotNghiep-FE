import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';  
import { 
  getStatisticalsFailMessage, 
  getDetailStatisticalOfUserFailMessage 
} from '../../constants/messageResponse';

//GET_STATISTICALS
const getStatisticalsSuccess = (data) => ({
  type: actionTypes.GET_STATISTICALS.SUCCESS,
  data,
})

const getStatisticalsFail = (err) => ({
  type: actionTypes.GET_STATISTICALS.FAIL,
  err,
})

export const getStatisticals = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_STATISTICALS.PENDING });
    axios.get(`/api/statisticals`)
      .then((response) => {
        dispatch(getStatisticalsSuccess(response.data));
      })
      .catch(err => {
        dispatch(getStatisticalsFail(getStatisticalsFailMessage));
      });
  };
}

//GET_DETAIL_STATISTICAL_OF_USER
const getDetailStatisticalOfUserSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_STATISTICAL_OF_USER.SUCCESS,
  data,
})

const getDetailStatisticalOfUserFail = (err) => ({
  type: actionTypes.GET_DETAIL_STATISTICAL_OF_USER.FAIL,
  err,
})

export const getDetailStatisticalOfUser = (userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DETAIL_STATISTICAL_OF_USER.PENDING });
    axios.get(`/api/statisticals/${userId}`)
      .then((response) => {
        dispatch(getDetailStatisticalOfUserSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDetailStatisticalOfUserFail(getDetailStatisticalOfUserFailMessage));
      });
  };
}