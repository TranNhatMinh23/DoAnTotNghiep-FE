import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listExamSchedule: [],
  isUpdating: false,
  isUpdatingStatus: false,
  detailExamSchedule: null,
  isLoadingCreate: false,
  isLoadingEdit: false,
  isEditSuccess: false,
  deleteEmailInvitedSuccess: false,
  isLoadingImportExcelInvite: false
};

//GET_ALL_EXAM_SCHEDULE
const getAllExamSchedulePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listExamSchedule: []
  })
}

const getAllExamScheduleSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listExamSchedule: action.data,
	});
}

const getAllExamScheduleFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//DELETE_EXAM_SCHEDULE
const deleteExamSchedulePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteExamScheduleSuccess = (state, action) => {
  let objIndex = state.listExamSchedule.findIndex((obj => obj.id === action.examScheduleId));
  let tempObjExamQuestions = state.listExamSchedule;
  tempObjExamQuestions.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listExamSchedule: tempObjExamQuestions
	});
}

const deleteExamScheduleFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//UPDATE_STATUS_EXAM_SCHEDULE
const updateStatusExamSchedulePending = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: true,
    err: false,
    message: ''
  })
}

const updateStatusExamScheduleSuccess = (state, action) => {
  let examUpdated = state.listExamSchedule.map(item => {
    if (item.id === action.data.id) return updateObject(item, {status: action.data.status});
    return item;
  });

	return updateObject(state, {
    isUpdatingStatus: false,
    listExamSchedule: examUpdated,
	});
}

const updateStatusExamScheduleFail = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: false,
    message: action.err,
    err: true,
  })
}

//GET_EXAM_SCHEDULE_BY_ID
const getExamScheduleByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailExamSchedule: null
  })
}

const getExamScheduleByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailExamSchedule: action.data,
	});
}

const getExamScheduleByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE_EXAM_SCHEDULE
const createExamSchedulePending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    err: false,
    message: ''
  })
}

const createExamScheduleSuccess = (state, action) => {
  let listExamScheduleNew = state.listExamSchedule.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    listExamSchedule: listExamScheduleNew
	});
}

const createExamScheduleFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

//EDIT_EXAM_SCHEDULE
const editExamSchedulePending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    isEditSuccess: false,
    err: false,
    message: ''
  })
}

const editExamScheduleSuccess = (state, action) => {
	return updateObject(state, {
    isLoadingEdit: false,
    isEditSuccess: true,
    detailExamSchedule: action.data
	});
}

const editExamScheduleFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

//CHANGE_VIEW_ANSWER_EXAM_STATUS
const changeViewAnswerExamStatusPending = (state, action) => {
  return updateObject(state, {
    isUpdating: true,
    err: false,
    message: ''
  })
}

const changeViewAnswerExamStatusSuccess = (state, action) => {
  let examUpdated = state.listExamSchedule.map(item => {
    if (item.id === action.data.id) return updateObject(item, {is_allow_view_answer: action.data.is_allow_view_answer});
    return item;
  });

	return updateObject(state, {
    isUpdating: false,
    listExamSchedule: examUpdated,
	});
}

const changeViewAnswerExamStatusFail = (state, action) => {
  return updateObject(state, {
    isUpdating: false,
    message: action.err,
    err: true,
  })
}

//DELETE_EMAIL_INVITATION 
const deleteEmailInvitationPending = (state, action) => {
  return updateObject(state, {
    isLoadingDeleteEmailInvited: true,
    deleteEmailInvitedSuccess: false,
    err: false,
    message: ''
  })
}

const deleteEmailInvitationSuccess = (state, action) => {
  let objIndex = state.detailExamSchedule.listEmailInvited.findIndex((obj => obj.id === action.emailInvitationId));
  let emailDeleted = state.detailExamSchedule.listEmailInvited[objIndex] ? state.detailExamSchedule.listEmailInvited[objIndex].email : '';
  let updatedEmailArr = state.detailExamSchedule.listEmails.filter(email => email !== emailDeleted);
  let listEmailUpdated = state.detailExamSchedule.listEmailInvited;
  listEmailUpdated.splice(objIndex, 1);
  let updateDetailExams = updateObject(state.detailExamSchedule, { listEmailInvited: listEmailUpdated, listEmails: updatedEmailArr});
	return updateObject(state, {
    isLoadingDeleteEmailInvited: false,
    deleteEmailInvitedSuccess: true,
    detailExamSchedule: updateDetailExams
	});
}

const deleteEmailInvitationFail = (state, action) => {
  return updateObject(state, {
    isLoadingDeleteEmailInvited: false,
    message: action.err,
    err: true,
  })
}

//IMPORT_FILE_EMAIL_INVITATION
const importEmailInvitationFilePending = (state, action) => {
  return updateObject(state, {
    isLoadingImportExcelInvite: true,
    err: false,
    message: ''
  })
}

const importEmailInvitationFileSuccess = (state, action) => {
  return updateObject(state, {
    isLoadingImportExcelInvite: false,
    detailExamSchedule: action.data
  });
}

const importEmailInvitationFileFail = (state, action) => {
  return updateObject(state, {
    isLoadingImportExcelInvite: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EXAM_SCHEDULE.PENDING: return getAllExamSchedulePending(state, action);
    case actionTypes.GET_ALL_EXAM_SCHEDULE.SUCCESS: return getAllExamScheduleSuccess(state, action);
    case actionTypes.GET_ALL_EXAM_SCHEDULE.FAIL: return getAllExamScheduleFail(state, action);

    case actionTypes.DELETE_EXAM_SCHEDULE.PENDING: return deleteExamSchedulePending(state, action);
    case actionTypes.DELETE_EXAM_SCHEDULE.SUCCESS: return deleteExamScheduleSuccess(state, action);
    case actionTypes.DELETE_EXAM_SCHEDULE.FAIL: return deleteExamScheduleFail(state, action);

    case actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.PENDING: return updateStatusExamSchedulePending(state, action);
    case actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.SUCCESS: return updateStatusExamScheduleSuccess(state, action);
    case actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.FAIL: return updateStatusExamScheduleFail(state, action);

    case actionTypes.GET_EXAM_SCHEDULE_BY_ID.PENDING: return getExamScheduleByIdPending(state, action);
    case actionTypes.GET_EXAM_SCHEDULE_BY_ID.SUCCESS: return getExamScheduleByIdSuccess(state, action);
    case actionTypes.GET_EXAM_SCHEDULE_BY_ID.FAIL: return getExamScheduleByIdFail(state, action);

    case actionTypes.CREATE_EXAM_SCHEDULE.PENDING: return createExamSchedulePending(state, action);
    case actionTypes.CREATE_EXAM_SCHEDULE.SUCCESS: return createExamScheduleSuccess(state, action);
    case actionTypes.CREATE_EXAM_SCHEDULE.FAIL: return createExamScheduleFail(state, action);

    case actionTypes.EDIT_EXAM_SCHEDULE.PENDING: return editExamSchedulePending(state, action);
    case actionTypes.EDIT_EXAM_SCHEDULE.SUCCESS: return editExamScheduleSuccess(state, action);
    case actionTypes.EDIT_EXAM_SCHEDULE.FAIL: return editExamScheduleFail(state, action);

    case actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.PENDING: return changeViewAnswerExamStatusPending(state, action);
    case actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.SUCCESS: return changeViewAnswerExamStatusSuccess(state, action);
    case actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.FAIL: return changeViewAnswerExamStatusFail(state, action);

    case actionTypes.DELETE_EMAIL_INVITATION.PENDING: return deleteEmailInvitationPending(state, action);
    case actionTypes.DELETE_EMAIL_INVITATION.SUCCESS: return deleteEmailInvitationSuccess(state, action);
    case actionTypes.DELETE_EMAIL_INVITATION.FAIL: return deleteEmailInvitationFail(state, action);

    case actionTypes.IMPORT_FILE_EMAIL_INVITATION.PENDING: return importEmailInvitationFilePending(state, action);
    case actionTypes.IMPORT_FILE_EMAIL_INVITATION.SUCCESS: return importEmailInvitationFileSuccess(state, action);
    case actionTypes.IMPORT_FILE_EMAIL_INVITATION.FAIL: return importEmailInvitationFileFail(state, action);

    default: return state;
  }
};

export default reducer;