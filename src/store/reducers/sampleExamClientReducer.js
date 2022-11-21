import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listSamples: null,
  detailSampleBeforeTaken: null,
  detailSample: null
};

//GET SAMPLE CLIENT
const getSampleExamsClientPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listSamples: null
  });
}

const getSampleExamsClientSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    listSamples: action.data
  });
}

const getSampleExamsClientFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID
const getSampleExamClientBeforeTakenByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailSampleBeforeTaken: null
  });
}

const getSampleExamClientBeforeTakenByIdSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    detailSampleBeforeTaken: action.data
  });
}

const getSampleExamClientBeforeTakenByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//GET SAMPLE EXAM CLIENT BY ID
const getSampleExamClientByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailSample: null
  });
}

const getSampleExamClientByIdSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    detailSample: action.data
  });
}

const getSampleExamClientByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}
 

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SAMPLE_EXAMS_CLIENT.PENDING: return getSampleExamsClientPending(state, action);
    case actionTypes.GET_SAMPLE_EXAMS_CLIENT.SUCCESS: return getSampleExamsClientSuccess(state, action);
    case actionTypes.GET_SAMPLE_EXAMS_CLIENT.FAIL: return getSampleExamsClientFail(state, action); 

    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.PENDING: return getSampleExamClientBeforeTakenByIdPending(state, action);
    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.SUCCESS: return getSampleExamClientBeforeTakenByIdSuccess(state, action);
    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BEFORE_TAKEN_BY_ID.FAIL: return getSampleExamClientBeforeTakenByIdFail(state, action);

    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.PENDING: return getSampleExamClientByIdPending(state, action);
    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.SUCCESS: return getSampleExamClientByIdSuccess(state, action);
    case actionTypes.GET_SAMPLE_EXAM_CLIENT_BY_ID.FAIL: return getSampleExamClientByIdFail(state, action);

    default: return state;
  }
};

export default reducer;
