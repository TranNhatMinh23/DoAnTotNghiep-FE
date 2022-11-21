import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import { sendContactFailMessage, sendContactSuccessMessage, myReportsFailMessage } from '../../constants/messageResponseClient';

//SEND_CONTACT
const sendContactSuccess = (data) => ({
  type: actionTypes.SEND_CONTACT.SUCCESS,
  data
});

const sendContactFail = (err) => ({
  type: actionTypes.SEND_CONTACT.FAIL,
  err,
});

export const sendContact = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.SEND_CONTACT.PENDING });
    axios.post(`/api/contacts/sent`, data)
      .then((response) => {
        dispatch(sendContactSuccess(response.data));
        toastMessage("success", sendContactSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : sendContactFailMessage;
        dispatch(sendContactFail(error));
        toastMessage("error", error);
      });
  }
}

// MY_REPORTS
const myReportsSuccess = (data) => ({
  type: actionTypes.MY_REPORTS.SUCCESS,
  data
});

const myReportsFail = (err) => ({
  type: actionTypes.MY_REPORTS.FAIL,
  err,
});

export const myReports = () => {
  return dispatch => {
    dispatch({ type: actionTypes.MY_REPORTS.PENDING });
    axios.get(`/api/my_reports`)
      .then((response) => {
        dispatch(myReportsSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : myReportsFailMessage;
        dispatch(myReportsFail(error));
        toastMessage("error", error);
      });
  }
}