import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listExams: null,
  detailExamBeforeTaken: null,
  detailExam: null
};

//GET_ALL_EXAM_PRACTICE 
const getAllExamPracticePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listExams: null
  });
}

const getAllExamPracticeSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    listExams: action.data
  });
}

const getAllExamPracticeFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//GET_EXAM_BEFORE_TAKEN_BY_ID
const getExamBeforeTakenByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailExamBeforeTaken: null
  });
}

const getExamBeforeTakenByIdSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    detailExamBeforeTaken: action.data
  });
}

const getExamBeforeTakenByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//GET_EXAM_BY_ID_CLIENT
const getExamByIdClientPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailExam: null
  });
}

const getExamByIdClientSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    detailExam: action.data
  });
}

const getExamByIdClientFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}
 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EXAM_PRACTICE.PENDING: return getAllExamPracticePending(state, action);
    case actionTypes.GET_ALL_EXAM_PRACTICE.SUCCESS: return getAllExamPracticeSuccess(state, action);
    case actionTypes.GET_ALL_EXAM_PRACTICE.FAIL: return getAllExamPracticeFail(state, action);

    case actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.PENDING: return getExamBeforeTakenByIdPending(state, action);
    case actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.SUCCESS: return getExamBeforeTakenByIdSuccess(state, action);
    case actionTypes.GET_EXAM_BEFORE_TAKEN_BY_ID.FAIL: return getExamBeforeTakenByIdFail(state, action);

    case actionTypes.GET_EXAM_BY_ID_CLIENT.PENDING: return getExamByIdClientPending(state, action);
    case actionTypes.GET_EXAM_BY_ID_CLIENT.SUCCESS: return getExamByIdClientSuccess(state, action);
    case actionTypes.GET_EXAM_BY_ID_CLIENT.FAIL: return getExamByIdClientFail(state, action); 

    default: return state;
  }
};

export default reducer;
