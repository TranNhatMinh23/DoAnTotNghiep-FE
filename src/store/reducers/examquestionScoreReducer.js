import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listExamQuestionScore: [],
  isLoadingCreate: false,
  isCreateSuccess: false,
  detailExamQuestionScore: null,
  isLoadingEdit: false,
  isLoadingUpdateDetailScore: false,
  isLoadingImportDetailScore: false
};

//GET_ALL_EXAM_QUESTION_SCORE
const getAllExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listExamQuestionScore: []
  })
}

const getAllExamQuestionScoreSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    listExamQuestionScore: action.data,
  });
}

const getAllExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE_EXAM_QUESTION_SCORE
const createExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    isCreateSuccess: false,
    err: false,
    message: ''
  })
}

const createExamQuestionScoreSuccess = (state, action) => {
  let listExamQuestionScoreNew = state.listExamQuestionScore.concat(action.data);
  return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: true,
    listExamQuestionScore: listExamQuestionScoreNew
  });
}

const createExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

const resetStatusCreatedNewExamQuestionScore = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: false,
    isLoadingEdit: false,
  });
}

//DELETE_EXAM_QUESTION_SCORE
const deleteExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteExamQuestionScoreSuccess = (state, action) => {
  let objIndex = state.listExamQuestionScore.findIndex((obj => obj.id === action.examQuestionScoreId));
  let tempObjExamQuestions = state.listExamQuestionScore;
  tempObjExamQuestions.splice(objIndex, 1);
  return updateObject(state, {
    isLoading: false,
    listExamQuestionScore: tempObjExamQuestions
  });
}

const deleteExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID
const getExamQuestionScoreByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailExamQuestionScore: null
  })
}

const getExamQuestionScoreByIdSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    detailExamQuestionScore: action.data,
  });
}

const getExamQuestionScoreByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_EXAM_QUESTION_SCORE
const editExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    isCreateSuccess: false,
    err: false,
    message: ''
  })
}

const editExamQuestionScoreSuccess = (state, action) => {
  let listExamQuestionScoreUpdated = state.listExamQuestionScore.map(item => {
    if (item.id === action.data.id) return action.data;
    return item;
  });

  return updateObject(state, {
    isLoadingEdit: false,
    isCreateSuccess: true,
    listExamQuestionScore: listExamQuestionScoreUpdated
  });
}

const editExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

//UPDATE_DETAIL_EXAM_QUESTION_SCORE
const updateDetailExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoadingUpdateDetailScore: true,
    err: false,
    message: ''
  })
}

const updateDetailExamQuestionScoreSuccess = (state, action) => {
  let detailExamQuestionScoreUpdate = updateObject(state.detailExamQuestionScore, { detail: action.data });
  return updateObject(state, {
    detailExamQuestionScore: detailExamQuestionScoreUpdate,
    isLoadingUpdateDetailScore: false,
  });
}

const updateDetailExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoadingUpdateDetailScore: false,
    message: action.err,
    err: true,
  })
}

//IMPORT SCORE_MAPPING FILE
const importDetailExamQuestionScorePending = (state, action) => {
  return updateObject(state, {
    isLoadingImportDetailScore: true,
    err: false,
    message: ''
  })
}

const importDetailExamQuestionScoreSuccess = (state, action) => {
  return updateObject(state, {
    detailExamQuestionScore: action.data,
    isLoadingImportDetailScore: false,
  });
}

const importDetailExamQuestionScoreFail = (state, action) => {
  return updateObject(state, {
    isLoadingImportDetailScore: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EXAM_QUESTION_SCORE.PENDING: return getAllExamQuestionScorePending(state, action);
    case actionTypes.GET_ALL_EXAM_QUESTION_SCORE.SUCCESS: return getAllExamQuestionScoreSuccess(state, action);
    case actionTypes.GET_ALL_EXAM_QUESTION_SCORE.FAIL: return getAllExamQuestionScoreFail(state, action);

    case actionTypes.CREATE_EXAM_QUESTION_SCORE.PENDING: return createExamQuestionScorePending(state, action);
    case actionTypes.CREATE_EXAM_QUESTION_SCORE.SUCCESS: return createExamQuestionScoreSuccess(state, action);
    case actionTypes.CREATE_EXAM_QUESTION_SCORE.FAIL: return createExamQuestionScoreFail(state, action);

    case actionTypes.RESET_STATUS_CREATED_EXAM_QUESTION_SCORE: return resetStatusCreatedNewExamQuestionScore(state, action);

    case actionTypes.DELETE_EXAM_QUESTION_SCORE.PENDING: return deleteExamQuestionScorePending(state, action);
    case actionTypes.DELETE_EXAM_QUESTION_SCORE.SUCCESS: return deleteExamQuestionScoreSuccess(state, action);
    case actionTypes.DELETE_EXAM_QUESTION_SCORE.FAIL: return deleteExamQuestionScoreFail(state, action);

    case actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.PENDING: return getExamQuestionScoreByIdPending(state, action);
    case actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.SUCCESS: return getExamQuestionScoreByIdSuccess(state, action);
    case actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.FAIL: return getExamQuestionScoreByIdFail(state, action);

    case actionTypes.EDIT_EXAM_QUESTION_SCORE.PENDING: return editExamQuestionScorePending(state, action);
    case actionTypes.EDIT_EXAM_QUESTION_SCORE.SUCCESS: return editExamQuestionScoreSuccess(state, action);
    case actionTypes.EDIT_EXAM_QUESTION_SCORE.FAIL: return editExamQuestionScoreFail(state, action);

    case actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.PENDING: return updateDetailExamQuestionScorePending(state, action);
    case actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.SUCCESS: return updateDetailExamQuestionScoreSuccess(state, action);
    case actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.FAIL: return updateDetailExamQuestionScoreFail(state, action);

    case actionTypes.IMPORT_SCORE_MAPPING_FILE.PENDING: return importDetailExamQuestionScorePending(state, action);
    case actionTypes.IMPORT_SCORE_MAPPING_FILE.SUCCESS: return importDetailExamQuestionScoreSuccess(state, action);
    case actionTypes.IMPORT_SCORE_MAPPING_FILE.FAIL: return importDetailExamQuestionScoreFail(state, action);

    default: return state;
  }
};

export default reducer;