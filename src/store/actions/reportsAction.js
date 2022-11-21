import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils'; 
import { 
  getAllReportsFailMessage, 
  getDetailReportByExamIdFailMessage
} from '../../constants/messageResponse';
import { getResultByReportIdFailMessage } from '../../constants/messageResponseClient';

//GET_ALL_REPORT
const getAllReportsSuccess = (data) => ({
  type: actionTypes.GET_ALL_REPORT.SUCCESS,
  data
});

const getAllReportsFail = (err) => ({
  type: actionTypes.GET_ALL_REPORT.FAIL,
  err,
});

export const getAllReports = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_REPORT.PENDING });
    axios.get(`/api/reports`)
      .then((response) => { 
        dispatch(getAllReportsSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllReportsFailMessage;
        dispatch(getAllReportsFail(error));
        toastMessage("error", error);
      });
  }
}

//GET_DETAIL_REPORT_BY_EXAM_ID
const getDetailReportByExamIdSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.SUCCESS,
  data
});

const getDetailReportByExamIdFail = (err) => ({
  type: actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.FAIL,
  err,
});

export const getDetailReportByExamId = (examId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.PENDING });
    axios.get(`/api/reports/${examId}`)
      .then((response) => { 
        dispatch(getDetailReportByExamIdSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getDetailReportByExamIdFailMessage;
        dispatch(getDetailReportByExamIdFail(error));
        toastMessage("error", error);
      });
  }
}

//GET_RESULT_BY_REPORT_ID
const getResultByReportIdSuccess = (data) => ({
  type: actionTypes.GET_RESULT_BY_REPORT_ID.SUCCESS,
  data
});

const getResultByReportIdFail = (err) => ({
  type: actionTypes.GET_RESULT_BY_REPORT_ID.FAIL,
  err,
});

export const getResultByReportId = (reportId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_RESULT_BY_REPORT_ID.PENDING });
    axios.get(`/api/results/${reportId}`)
      .then(response => {  
        dispatch(getResultByReportIdSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getResultByReportIdFailMessage;
        dispatch(getResultByReportIdFail(error));
        toastMessage("error", error);
      });
  }
}