import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils'; 
import { 
  getAllMainInfoFailMessage 
} from '../../constants/messageResponse';

//GET_ALL_MAIN_INFO
const getAllMainInfoSuccess = (data) => ({
  type: actionTypes.GET_ALL_MAIN_INFO.SUCCESS,
  data
});

const getAllMainInfoFail = (err) => ({
  type: actionTypes.GET_ALL_MAIN_INFO.FAIL,
  err,
});

export const getAllMainInfo = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_MAIN_INFO.PENDING });
    axios.get(`/api/homes`)
      .then((response) => { 
        dispatch(getAllMainInfoSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllMainInfoFailMessage;
        dispatch(getAllMainInfoFail(error));
        toastMessage("error", error);
      });
  }
}