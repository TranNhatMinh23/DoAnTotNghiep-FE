import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  loadingSubmitAnswer: false,
  submitted: true,
  resultAfterSubmitted: null
};

 
//SUBMIT EXAM ANSWER
const submitExamAnswerPending = (state, action) => {
  return updateObject(state, {
    loadingSubmitAnswer: true,
    err: false,
    message: null,
    submitted: false,
    resultAfterSubmitted: null
  })
}

const submitExamAnswerSuccess = (state, action) => {
  return updateObject(state, {
    loadingSubmitAnswer: false,
    submitted: true,
    resultAfterSubmitted: action.data
  })
}

const submitExamAnswerFail = (state, action) => {
  return updateObject(state, {
    loadingSubmitAnswer: false,
    err: true,
    message: action.err,
  })
}

//GET_RESULT_AFTER_SUBMIT
const getResultAfterSubmitPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: null, 
    loadingSubmitAnswer: false,
    submitted: false,
    resultAfterSubmitted: null
  })
}

const getResultAfterSubmitSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false, 
    resultAfterSubmitted: action.data
  })
}

const getResultAfterSubmitFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
     
    case actionTypes.SUBMIT_EXAM_ANSWER.PENDING: return submitExamAnswerPending(state, action);
    case actionTypes.SUBMIT_EXAM_ANSWER.SUCCESS: return submitExamAnswerSuccess(state, action);
    case actionTypes.SUBMIT_EXAM_ANSWER.FAIL: return submitExamAnswerFail(state, action);

    case actionTypes.GET_RESULT_AFTER_SUBMIT.PENDING: return getResultAfterSubmitPending(state, action);
    case actionTypes.GET_RESULT_AFTER_SUBMIT.SUCCESS: return getResultAfterSubmitSuccess(state, action);
    case actionTypes.GET_RESULT_AFTER_SUBMIT.FAIL: return getResultAfterSubmitFail(state, action);

    default: return state;
  }
};

export default reducer;
