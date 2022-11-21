import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { 
  getAllCompanyFailMessage, 
  updateCompanyInfoSuccessMessage, 
  updateCompanyInfoFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';

// GET_ALL_COMPANY
const getAllCompanySuccess = (data) => ({
  type: actionTypes.GET_ALL_COMPANY.SUCCESS,
  data,
})

const getAllCompanyFail = (err) => ({
  type: actionTypes.GET_ALL_COMPANY.FAIL,
  err,
})

export const getAllCompany = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_COMPANY.PENDING });
    axios.get(`/api/companies`)
      .then((response) => {
        dispatch(getAllCompanySuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllCompanyFailMessage;
        dispatch(getAllCompanyFail(error));
        toastMessage("error", error);
      });
  };
}

//UPDATE_INFO_COMPANY
const updateCompanyInfoSuccess = (data) => ({
  type: actionTypes.UPDATE_INFO_COMPANY.SUCCESS,
  data,
})

const updateCompanyInfoFail = (err) => ({
  type: actionTypes.UPDATE_INFO_COMPANY.FAIL,
  err,
})

export const updateCompanyInfo = (companyId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_INFO_COMPANY.PENDING });
    axios.put(`/api/companies/${companyId}`, data)
      .then((response) => {
        dispatch(updateCompanyInfoSuccess(response.data));
        toastMessage("success", updateCompanyInfoSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updateCompanyInfoFailMessage;
        dispatch(updateCompanyInfoFail(error));
        toastMessage("error", error);
      });
  };
}