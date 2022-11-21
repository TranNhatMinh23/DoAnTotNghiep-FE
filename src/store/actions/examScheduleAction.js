import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import {
  getAllExamScheduleFailMessage,
  deleteExamScheduleSuccessMessage,
  deleteExamScheduleFailMessage,
  updateExamScheduleStatusSuccessMessage,
  updateExamScheduleStatusFailMessage,
  getExamScheduleByIdFailMessage,
  createExamScheduleSuccessMessage,
  createExamScheduleFailMessage,
  editExamScheduleSuccessMessage,
  editExamScheduleFailMessage,
  changeViewAnswerExamStatusSuccessMessage,
  changeViewAnswerExamStatusFailMessage,
  deleteEmailInvitationSuccessMessage,
  deleteEmailInvitationFailMessage,
  importEmailInvitationFileSuccessMessage,
  importEmailInvitationFileFailMessage
} from '../../constants/messageResponse';
import { message } from 'antd';

//GET_ALL_EXAM_SCHEDULE
const getAllExamScheduleSuccess = (data) => ({
  type: actionTypes.GET_ALL_EXAM_SCHEDULE.SUCCESS,
  data,
})

const getAllExamScheduleFail = (err) => ({
  type: actionTypes.GET_ALL_EXAM_SCHEDULE.FAIL,
  err,
})

export const getAllExamSchedule = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_EXAM_SCHEDULE.PENDING });
    axios.get(`/api/exam_schedules`)
      .then((response) => {
        dispatch(getAllExamScheduleSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllExamScheduleFailMessage;
        dispatch(getAllExamScheduleFail(error));
        toastMessage("error", error);
      });
  };
}

//UPDATE_STATUS_EXAM_SCHEDULE
const updateExamScheduleStatusSuccess = (data) => ({
  type: actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.SUCCESS,
  data
})

const updateExamScheduleStatusFail = (err) => ({
  type: actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.FAIL,
  err,
})

export const updateExamScheduleStatus = (examScheduleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_STATUS_EXAM_SCHEDULE.PENDING });
    axios.put(`/api/exam_schedules/${examScheduleId}/status`)
      .then((response) => {
        dispatch(updateExamScheduleStatusSuccess(response.data));
        message.success(updateExamScheduleStatusSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updateExamScheduleStatusFailMessage;
        dispatch(updateExamScheduleStatusFail(error));
        message.error(error);
      });
  };
}

//GET_EXAM_SCHEDULE_BY_ID
const getExamScheduleByIdSuccess = (data) => ({
  type: actionTypes.GET_EXAM_SCHEDULE_BY_ID.SUCCESS,
  data,
})

const getExamScheduleByIdFail = (err) => ({
  type: actionTypes.GET_EXAM_SCHEDULE_BY_ID.FAIL,
  err,
})

export const getExamScheduleById = (examScheduleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_EXAM_SCHEDULE_BY_ID.PENDING });
    axios.get(`/api/exam_schedules/${examScheduleId}`)
      .then((response) => {
        dispatch(getExamScheduleByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getExamScheduleByIdFailMessage;
        dispatch(getExamScheduleByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//CREATE_EXAM_SCHEDULE
const createExamScheduleSuccess = (data) => ({
  type: actionTypes.CREATE_EXAM_SCHEDULE.SUCCESS,
  data,
})

const createExamScheduleFail = (err) => ({
  type: actionTypes.CREATE_EXAM_SCHEDULE.FAIL,
  err,
})

export const createExamSchedule = (data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.CREATE_EXAM_SCHEDULE.PENDING });
    axios.post(`/api/exam_schedules`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(createExamScheduleSuccess(response.data));
        toastMessage("success", createExamScheduleSuccessMessage);
      })
      .catch(err => {

        let error = err.response ? err.response.data.error : createExamScheduleFailMessage;
        dispatch(createExamScheduleFail(error));
        toastMessage("error", error);
      });
  };
}

//EDIT_EXAM_SCHEDULE
const editExamScheduleSuccess = (data) => ({
  type: actionTypes.EDIT_EXAM_SCHEDULE.SUCCESS,
  data,
})

const editExamScheduleFail = (err) => ({
  type: actionTypes.EDIT_EXAM_SCHEDULE.FAIL,
  err,
})

export const editExamSchedule = (examScheduleId, data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.EDIT_EXAM_SCHEDULE.PENDING });
    axios.post(`/api/exam_schedules/${examScheduleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(editExamScheduleSuccess(response.data));
        toastMessage("success", editExamScheduleSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editExamScheduleFailMessage; 
        dispatch(editExamScheduleFail(error));
        toastMessage("error", error);
      });
  };
}

//DELETE_EXAM_SCHEDULE
const deleteExamScheduleSuccess = (examScheduleId) => ({
  type: actionTypes.DELETE_EXAM_SCHEDULE.SUCCESS,
  examScheduleId,
})

const deleteExamScheduleFail = (err) => ({
  type: actionTypes.DELETE_EXAM_SCHEDULE.FAIL,
  err,
})

export const deleteExamSchedule = (examScheduleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_EXAM_SCHEDULE.PENDING });
    axios.delete(`/api/exam_schedules/${examScheduleId}`)
      .then((response) => {
        dispatch(deleteExamScheduleSuccess(examScheduleId));
        toastMessage("success", deleteExamScheduleSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : deleteExamScheduleFailMessage;
        dispatch(deleteExamScheduleFail(error));
        toastMessage("error", error);
      });
  };
}

//CHANGE_VIEW_ANSWER_EXAM_STATUS
const changeViewAnswerExamStatusSuccess = (data) => ({
  type: actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.SUCCESS,
  data
})

const changeViewAnswerExamStatusFail = (err) => ({
  type: actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.FAIL,
  err,
})

export const changeViewAnswerExamStatus = (examScheduleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_VIEW_ANSWER_EXAM_STATUS.PENDING });
    axios.put(`/api/exam_schedules/${examScheduleId}/is_view_answers`)
      .then((response) => {
        dispatch(changeViewAnswerExamStatusSuccess(response.data));
        message.success(changeViewAnswerExamStatusSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : changeViewAnswerExamStatusFailMessage;
        dispatch(changeViewAnswerExamStatusFail(error));
        message.error(error);
      });
  };
}

//DELETE_EMAIL_INVITATION
const deleteEmailInvitationSuccess = (emailInvitationId) => ({
  type: actionTypes.DELETE_EMAIL_INVITATION.SUCCESS,
  emailInvitationId,
})

const deleteEmailInvitationFail = (err) => ({
  type: actionTypes.DELETE_EMAIL_INVITATION.FAIL,
  err,
})

export const deleteEmailInvitation = (emailInvitationId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_EMAIL_INVITATION.PENDING });
    axios.delete(`/api/exam_schedules/email_invitation/${emailInvitationId}`)
      .then((response) => { 
        dispatch(deleteEmailInvitationSuccess(emailInvitationId));
        toastMessage("success", deleteEmailInvitationSuccessMessage);
      })
      .catch(err => {
        console.log(err);
        let error = err.response ? err.response.data.error : deleteEmailInvitationFailMessage;
        dispatch(deleteEmailInvitationFail(error));
        toastMessage("error", error);
      });
  };
}

//IMPORT_FILE_EMAIL_INVITATION
const importEmailInvitationFileSuccess = (data) => ({
  type: actionTypes.IMPORT_FILE_EMAIL_INVITATION.SUCCESS,
  data,
})

const importEmailInvitationFileFail = (err) => ({
  type: actionTypes.IMPORT_FILE_EMAIL_INVITATION.FAIL,
  err,
})

export const importEmailInvitationFile = (examsId, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("files", files);
    dispatch({ type: actionTypes.IMPORT_FILE_EMAIL_INVITATION.PENDING });
    axios.post(`/api/exam_schedules/import_email_invitation/${examsId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        toastMessage("success", importEmailInvitationFileSuccessMessage);
        dispatch(importEmailInvitationFileSuccess(response.data));
      })
      .catch(err => {
        let error = err.response.data.error ? err.response.data.error : importEmailInvitationFileFailMessage;
        toastMessage("error", error);
        dispatch(importEmailInvitationFileFail(error));
      });
  };
}