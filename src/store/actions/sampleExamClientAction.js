import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import {
  getSampleExamsClientFailMessage,
  getSampleExamClientBeforeTakenByIdFailMessage,
  getSampleExamClientByIdFailMessage 
} from '../../constants/messageResponseClient';

//GET_SAMPLE_EXAMS_CLIENT
const getSampleExamsClientSuccess = (data) => ({
  type: actionTypes.GET_SAMPLE_EXAMS_CLIENT.SUCCESS,
  data,
})

const getSampleExamsClientFail = (err) => ({
  type: actionTypes.GET_SAMPLE_EXAMS_CLIENT.FAIL,
  err,
})

export const getSampleExamsClient = (page = 1) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_SAMPLE_EXAMS_CLIENT.PENDING });
    axios.get(`/api/client/samples?page=${page}`)
      .then((response) => {
        dispatch(getSampleExamsClientSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getSampleExamsClientFailMessage;
        dispatch(getSampleExamsClientFail(error));
        toastMessage("error", error);
      });
  };
}

//// GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID
const getSampleExamClientBeforeTakenByIdSuccess = (data) => ({
  type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.SUCCESS,
  data,
})

const getSampleExamClientBeforeTakenByIdFail = (err) => ({
  type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.FAIL,
  err,
})

export const getSampleExamClientBeforeTakenById = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.PENDING });
    axios.get(`/api/client/samples/${sampleExamId}/before_test`)
      .then((response) => {
        dispatch(getSampleExamClientBeforeTakenByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getSampleExamClientBeforeTakenByIdFailMessage;
        dispatch(getSampleExamClientBeforeTakenByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//GET SAMPLE EXAM BY ID CLIENT
const getSampleExamClientByIdSuccess = (data) => ({
  type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.SUCCESS,
  data,
})

const getSampleExamClientByIdFail = (err) => ({
  type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.FAIL,
  err,
})

export const getSampleExamClientById = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.PENDING });
    axios.get(`/api/client/samples/${sampleExamId}`)
      .then((response) => {
        dispatch(getSampleExamClientByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getSampleExamClientByIdFailMessage;
        dispatch(getSampleExamClientByIdFail(error));
        toastMessage("error", error);
      });
  };
}
