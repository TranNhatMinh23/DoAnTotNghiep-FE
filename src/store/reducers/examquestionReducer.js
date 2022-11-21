import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listExamQuestions: [],
  listExamQuestionOfSystemForCompanyToUse: [],
  isLoadingCreate: false,
  isCreateSuccess: false,
  detailExamQuestion: null,
  isLoadingUpdate: false,
  isUploadingAudio: false
};

//GET_ALL_EXAM_QUESTION
const getAllExamQuestionsPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listExamQuestions: []
  })
}

const getAllExamQuestionsSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listExamQuestions: action.data,
	});
}

const getAllExamQuestionsFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE_NEW_EXAM_QUESTION
const createNewExamQuestionPending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    isCreateSuccess: false,
    err: false,
    message: ''
  })
}

const createNewExamQuestionSuccess = (state, action) => {
  let listExamQuestionsNew = state.listExamQuestions.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: true,
    listExamQuestions: listExamQuestionsNew
	});
}

const createNewExamQuestionFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

const resetStatusCreatedNewExamQuestion = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: false,
  });
}

//DELETE_EXAM_QUESTION
const deleteExamQuestionPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteExamQuestionSuccess = (state, action) => {
  let objIndex = state.listExamQuestions.findIndex((obj => obj.id === action.examQuestionId));
  let tempObjExamQuestions = state.listExamQuestions;
  tempObjExamQuestions.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listExamQuestions: tempObjExamQuestions
	});
}

const deleteExamQuestionFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//GET_EXAM_QUESTION_BY_ID
const getExamQuestionByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailExamQuestion: null
  })
}

const getExamQuestionByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailExamQuestion: action.data,
	});
}

const getExamQuestionByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_EXAM_QUESTION_INFO
const editExamQuestionInfoPending = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: true,
    err: false,
    message: ''
  })
}

const editExamQuestionInfoSuccess = (state, action) => {
  let detailExamQuestionUpdate = updateObject(state.detailExamQuestion, {
    name: action.data.name,
  });

	return updateObject(state, {
    isLoadingUpdate: false,
    detailExamQuestion: detailExamQuestionUpdate,
	});
}

const editExamQuestionInfoFail = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: false,
    message: action.err,
    err: true,
  })
}

//UPLOAD_AUDIO_FOR_TEST
const uploadAudioForTestPending = (state, action) => {
  return updateObject(state, {
    isUploadingAudio: true,
    err: false,
    message: ''
  })
}

const uploadAudioForTestSuccess = (state, action) => {
  let detailExamQuestionUpdate = updateObject(state.detailExamQuestion, {
    audio: action.data,
  });

	return updateObject(state, {
    isUploadingAudio: false,
    detailExamQuestion: detailExamQuestionUpdate,
	});
}

const uploadAudioForTestFail = (state, action) => {
  return updateObject(state, {
    isUploadingAudio: false,
    message: action.err,
    err: true,
  })
}

//GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY
const getAllExamQuestionOfSystemForCompanyToUsePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listExamQuestionOfSystemForCompanyToUse: []
  })
}

const getAllExamQuestionOfSystemForCompanyToUseSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listExamQuestionOfSystemForCompanyToUse: action.data,
	});
}

const getAllExamQuestionOfSystemForCompanyToUseFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case actionTypes.GET_ALL_EXAM_QUESTIONS.PENDING: return getAllExamQuestionsPending(state, action);
    case actionTypes.GET_ALL_EXAM_QUESTIONS.SUCCESS: return getAllExamQuestionsSuccess(state, action);
    case actionTypes.GET_ALL_EXAM_QUESTIONS.FAIL: return getAllExamQuestionsFail(state, action);

    case actionTypes.CREATE_NEW_EXAM_QUESTION.PENDING: return createNewExamQuestionPending(state, action);
    case actionTypes.CREATE_NEW_EXAM_QUESTION.SUCCESS: return createNewExamQuestionSuccess(state, action);
    case actionTypes.CREATE_NEW_EXAM_QUESTION.FAIL: return createNewExamQuestionFail(state, action);

    case actionTypes.RESET_STATUS_CREATED_EXAM_QUESTION: return resetStatusCreatedNewExamQuestion(state, action);

    case actionTypes.DELETE_EXAM_QUESTION.PENDING: return deleteExamQuestionPending(state, action);
    case actionTypes.DELETE_EXAM_QUESTION.SUCCESS: return deleteExamQuestionSuccess(state, action);
    case actionTypes.DELETE_EXAM_QUESTION.FAIL: return deleteExamQuestionFail(state, action);

    case actionTypes.GET_EXAM_QUESTION_BY_ID.PENDING: return getExamQuestionByIdPending(state, action);
    case actionTypes.GET_EXAM_QUESTION_BY_ID.SUCCESS: return getExamQuestionByIdSuccess(state, action);
    case actionTypes.GET_EXAM_QUESTION_BY_ID.FAIL: return getExamQuestionByIdFail(state, action);

    case actionTypes.EDIT_EXAM_QUESTION_INFO.PENDING: return editExamQuestionInfoPending(state, action);
    case actionTypes.EDIT_EXAM_QUESTION_INFO.SUCCESS: return editExamQuestionInfoSuccess(state, action);
    case actionTypes.EDIT_EXAM_QUESTION_INFO.FAIL: return editExamQuestionInfoFail(state, action);

    case actionTypes.UPLOAD_AUDIO_FOR_TEST.PENDING: return uploadAudioForTestPending(state, action);
    case actionTypes.UPLOAD_AUDIO_FOR_TEST.SUCCESS: return uploadAudioForTestSuccess(state, action);
    case actionTypes.UPLOAD_AUDIO_FOR_TEST.FAIL: return uploadAudioForTestFail(state, action);
 
    case actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.PENDING: return getAllExamQuestionOfSystemForCompanyToUsePending(state, action);
    case actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.SUCCESS: return getAllExamQuestionOfSystemForCompanyToUseSuccess(state, action);
    case actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.FAIL: return getAllExamQuestionOfSystemForCompanyToUseFail(state, action);

		default: return state;
	}
};

export default reducer;