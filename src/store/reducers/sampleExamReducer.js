import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listSampleExams: [],
  isUpdating: false,
  isUpdatingStatus: false,
  detailSampleExam: null,
  isLoadingCreate: false,
  isLoadingEdit: false
};

//GET ALL SAMPLE EXAMS
const getAllSampleExamPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listSampleExams: []
  })
}

const getAllSampleExamSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listSampleExams: action.data,
	});
}

const getAllSampleExamFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE_SAMPLE_EXAM
const createSampleExamPending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    err: false,
    message: ''
  })
}

const createSampleExamSuccess = (state, action) => {
  let listSampleExamsNew = state.listSampleExams.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    listSampleExams: listSampleExamsNew
	});
}

const createSampleExamFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

//GET_SAMPLE_EXAM_BY_ID
const getSampleExamByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailSampleExam: null
  })
}

const getSampleExamByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailSampleExam: action.data,
	});
}

const getSampleExamByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_SAMPLE_EXAM
const editSampleExamPending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    err: false,
    message: ''
  })
}

const editSampleExamSuccess = (state, action) => {
	return updateObject(state, {
    isLoadingEdit: false
	});
}

const editSampleExamFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

//DELETE_SAMPLE_EXAM
const deleteSampleExamPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteSampleExamSuccess = (state, action) => {
  let objIndex = state.listSampleExams.findIndex((obj => obj.id === action.sampleExamId));
  let tempObjSampleExam = state.listSampleExams;
  tempObjSampleExam.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listSampleExams: tempObjSampleExam
	});
}

const deleteSampleExamFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CHANGE_STATUS_SAMPLE_EXAM
const changeStatusSampleExamPending = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: true,
    err: false,
    message: ''
  })
}

const changeStatusSampleExamSuccess = (state, action) => {
  let sampleExamUpdated = state.listSampleExams.map(item => {
    if (item.id === action.data.id) return updateObject(item, {status: action.data.status});
    return item;
  });

	return updateObject(state, {
    isUpdatingStatus: false,
    listSampleExams: sampleExamUpdated,
	});
}

const changeStatusSampleExamFail = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: false,
    message: action.err,
    err: true,
  })
}

//CHANGE_VIEW_ANSWER_STATUS
const changeViewAnswerStatusPending = (state, action) => {
  return updateObject(state, {
    isUpdating: true,
    err: false,
    message: ''
  })
}

const changeViewAnswerStatusSuccess = (state, action) => {
  let sampleExamUpdated = state.listSampleExams.map(item => {
    if (item.id === action.data.id) return updateObject(item, {is_allow_view_answer: action.data.is_allow_view_answer});
    return item;
  });

	return updateObject(state, {
    isUpdating: false,
    listSampleExams: sampleExamUpdated,
	});
}

const changeViewAnswerStatusFail = (state, action) => {
  return updateObject(state, {
    isUpdating: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SAMPLE_EXAMS.PENDING: return getAllSampleExamPending(state, action);
    case actionTypes.GET_ALL_SAMPLE_EXAMS.SUCCESS: return getAllSampleExamSuccess(state, action);
    case actionTypes.GET_ALL_SAMPLE_EXAMS.FAIL: return getAllSampleExamFail(state, action);

    case actionTypes.CREATE_SAMPLE_EXAM.PENDING: return createSampleExamPending(state, action);
    case actionTypes.CREATE_SAMPLE_EXAM.SUCCESS: return createSampleExamSuccess(state, action);
    case actionTypes.CREATE_SAMPLE_EXAM.FAIL: return createSampleExamFail(state, action);

    case actionTypes.GET_SAMPLE_EXAM_BY_ID.PENDING: return getSampleExamByIdPending(state, action);
    case actionTypes.GET_SAMPLE_EXAM_BY_ID.SUCCESS: return getSampleExamByIdSuccess(state, action);
    case actionTypes.GET_SAMPLE_EXAM_BY_ID.FAIL: return getSampleExamByIdFail(state, action);

    case actionTypes.EDIT_SAMPLE_EXAM.PENDING: return editSampleExamPending(state, action);
    case actionTypes.EDIT_SAMPLE_EXAM.SUCCESS: return editSampleExamSuccess(state, action);
    case actionTypes.EDIT_SAMPLE_EXAM.FAIL: return editSampleExamFail(state, action);

    case actionTypes.DELETE_SAMPLE_EXAM.PENDING: return deleteSampleExamPending(state, action);
    case actionTypes.DELETE_SAMPLE_EXAM.SUCCESS: return deleteSampleExamSuccess(state, action);
    case actionTypes.DELETE_SAMPLE_EXAM.FAIL: return deleteSampleExamFail(state, action);

    case actionTypes.CHANGE_STATUS_SAMPLE_EXAM.PENDING: return changeStatusSampleExamPending(state, action);
    case actionTypes.CHANGE_STATUS_SAMPLE_EXAM.SUCCESS: return changeStatusSampleExamSuccess(state, action);
    case actionTypes.CHANGE_STATUS_SAMPLE_EXAM.FAIL: return changeStatusSampleExamFail(state, action);

    case actionTypes.CHANGE_VIEW_ANSWER_STATUS.PENDING: return changeViewAnswerStatusPending(state, action);
    case actionTypes.CHANGE_VIEW_ANSWER_STATUS.SUCCESS: return changeViewAnswerStatusSuccess(state, action);
    case actionTypes.CHANGE_VIEW_ANSWER_STATUS.FAIL: return changeViewAnswerStatusFail(state, action);

    default: return state;
  }
};

export default reducer;

