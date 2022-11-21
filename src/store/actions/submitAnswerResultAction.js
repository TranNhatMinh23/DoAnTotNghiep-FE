import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import {  
  submitExamAnswerFailMessage,
  getResultAfterSubmitFailMessage
} from '../../constants/messageResponseClient';
 
//SUBMIT_EXAM_ANSWER
const submitExamAnswerSuccess = (data) => ({
  type: actionTypes.SUBMIT_EXAM_ANSWER.SUCCESS,
  data,
})

const submitExamAnswerFail = (err) => ({
  type: actionTypes.SUBMIT_EXAM_ANSWER.FAIL,
  err
})

export const submitExamAnswer = (examId, listAnswer) => {
  return dispatch => {
    dispatch({ type: actionTypes.SUBMIT_EXAM_ANSWER.PENDING });
    axios.post(`/api/submit_answers/${examId}`, listAnswer)
      .then((response) => {
        dispatch(submitExamAnswerSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : submitExamAnswerFailMessage;
        dispatch(submitExamAnswerFail(error));
        toastMessage("error", error);
      });
  };
}

//GET_RESULT_AFTER_SUBMIT
const getResultAfterSubmitSuccess = (data) => ({
  type: actionTypes.GET_RESULT_AFTER_SUBMIT.SUCCESS,
  data,
})

const getResultAfterSubmitFail = (err) => ({
  type: actionTypes.GET_RESULT_AFTER_SUBMIT.FAIL,
  err
})

export const getResultAfterSubmit = (reportId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_RESULT_AFTER_SUBMIT.PENDING });
    axios.get(`/api/submit_answers/${reportId}`)
      .then((response) => {
        dispatch(getResultAfterSubmitSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getResultAfterSubmitFailMessage;
        dispatch(getResultAfterSubmitFail(error));
        toastMessage("error", error);
      });
  };
}