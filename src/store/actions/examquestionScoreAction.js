import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import {
  createExamQuestionScoreSuccessMessage,
  createExamQuestionScoreFailMessage,
  getAllExamQuestionScoreFailMessage,
  deleteExamQuestionScoreSuccessMessage,
  deleteExamQuestionScoreFailMessage,
  getExamQuestionScoreByIdFailMessage,
  editExamQuestionScoreSuccessMessage,
  editExamQuestionScoreFailMessage,
  updateDetailExamQuestionScoreFailMessage,
  updateDetailExamQuestionScoreSuccessMessage, 
  importScoreMappingFileFailMessage,
  importScoreMappingFileSuccessMessage
} from '../../constants/messageResponse';
import { message } from 'antd';
import { toastMessage } from '../../shared/utils';

//GET_ALL_EXAM_QUESTION_SCORE
const getAllExamQuestionScoreSuccess = (data) => ({
  type: actionTypes.GET_ALL_EXAM_QUESTION_SCORE.SUCCESS,
  data,
})

const getAllExamQuestionScoreFail = (err) => ({
  type: actionTypes.GET_ALL_EXAM_QUESTION_SCORE.FAIL,
  err,
})

export const getAllExamQuestionScore = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_EXAM_QUESTION_SCORE.PENDING });
    axios.get(`/api/exam_question_scores`)
      .then((response) => {
        dispatch(getAllExamQuestionScoreSuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllExamQuestionScoreFail(getAllExamQuestionScoreFailMessage));
      });
  };
}

//CREATE_EXAM_QUESTION_SCORE
const createExamQuestionScoreSuccess = (data) => ({
  type: actionTypes.CREATE_EXAM_QUESTION_SCORE.SUCCESS,
  data,
})

const createExamQuestionScoreFail = (err) => ({
  type: actionTypes.CREATE_EXAM_QUESTION_SCORE.FAIL,
  err,
})

export const createExamQuestionScore = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.CREATE_EXAM_QUESTION_SCORE.PENDING });
    axios.post(`/api/exam_question_scores`, data)
      .then((response) => {
        dispatch(createExamQuestionScoreSuccess(response.data));
        message.success(createExamQuestionScoreSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : createExamQuestionScoreFailMessage;
        if (err.response.data.error['name']) {
          error = err.response.data.error['name'];
        }
        dispatch(createExamQuestionScoreFail(error));
        message.error(error);
      });
  };
}

export const resetStatusCreatedNewExamQuestionScore = () => ({
  type: actionTypes.RESET_STATUS_CREATED_EXAM_QUESTION_SCORE
});

//EDIT_EXAM_QUESTION_SCORE
const editExamQuestionScoreSuccess = (data) => ({
  type: actionTypes.EDIT_EXAM_QUESTION_SCORE.SUCCESS,
  data,
})

const editExamQuestionScoreFail = (err) => ({
  type: actionTypes.EDIT_EXAM_QUESTION_SCORE.FAIL,
  err,
})

export const editExamQuestionScore = (examQuestionScoreId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.EDIT_EXAM_QUESTION_SCORE.PENDING });
    axios.put(`/api/exam_question_scores/${examQuestionScoreId}`, data)
      .then((response) => {
        dispatch(editExamQuestionScoreSuccess(response.data));
        message.success(editExamQuestionScoreSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editExamQuestionScoreFailMessage;
        if (err.response.data.error['name']) {
          error = err.response.data.error['name'];
        }
        dispatch(editExamQuestionScoreFail(error));
        message.error(error);
      });
  };
}

//DELETE_EXAM_QUESTION_SCORE
const deleteExamQuestionScoreSuccess = (examQuestionScoreId) => ({
  type: actionTypes.DELETE_EXAM_QUESTION_SCORE.SUCCESS,
  examQuestionScoreId,
})

const deleteExamQuestionScoreFail = (err) => ({
  type: actionTypes.DELETE_EXAM_QUESTION_SCORE.FAIL,
  err,
})

export const deleteExamQuestionScore = (examQuestionScoreId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_EXAM_QUESTION_SCORE.PENDING });
    axios.delete(`/api/exam_question_scores/${examQuestionScoreId}`)
      .then((response) => {
        message.success(deleteExamQuestionScoreSuccessMessage);
        dispatch(deleteExamQuestionScoreSuccess(examQuestionScoreId));
      })
      .catch(err => {
        message.error(deleteExamQuestionScoreFailMessage);
        dispatch(deleteExamQuestionScoreFail(deleteExamQuestionScoreFailMessage));
      });
  };
}


//GET_DETAIL_EXAM_QUESTION_SCORE
const getExamQuestionScoreByIdSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.SUCCESS,
  data,
})

const getExamQuestionScoreByIdFail = (err) => ({
  type: actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.FAIL,
  err,
})

export const getExamQuestionScoreById = (examQuestionScoreId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DETAIL_EXAM_QUESTION_SCORE_BY_ID.PENDING });
    axios.get(`/api/exam_question_scores/${examQuestionScoreId}`)
      .then((response) => {
        dispatch(getExamQuestionScoreByIdSuccess(response.data));
      })
      .catch(err => {
        dispatch(getExamQuestionScoreByIdFail(getExamQuestionScoreByIdFailMessage));
      });
  };
}

//UPDATE_DETAIL_EXAM_QUESTION_SCORE
const updateDetailExamQuestionScoreSuccess = (data) => ({
  type: actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.SUCCESS,
  data,
})

const updateDetailExamQuestionScoreFail = (err) => ({
  type: actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.FAIL,
  err,
})

export const updateDetailExamQuestionScore = (examQuestionScoreId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_DETAIL_EXAM_QUESTION_SCORE.PENDING });
    axios.put(`/api/exam_question_scores/${examQuestionScoreId}/score_mapping`, data)
      .then((response) => {
        dispatch(updateDetailExamQuestionScoreSuccess(response.data));
        toastMessage("success", updateDetailExamQuestionScoreSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updateDetailExamQuestionScoreFailMessage;
        dispatch(updateDetailExamQuestionScoreFail(error));
        toastMessage("error", error);
      });
  };
}

//IMPORT SCORE_MAPPING FILE
const importScoreMappingFileSuccess = (data) => ({
  type: actionTypes.IMPORT_SCORE_MAPPING_FILE.SUCCESS,
  data,
})

const importScoreMappingFileFail = (err) => ({
  type: actionTypes.IMPORT_SCORE_MAPPING_FILE.FAIL,
  err,
})

export const importScoreMappingFile = (idExamQuestionScore, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("files", files);
    dispatch({ type: actionTypes.IMPORT_SCORE_MAPPING_FILE.PENDING });
    axios.post(`/api/exam_question_scores/import/${idExamQuestionScore}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        toastMessage("success", importScoreMappingFileSuccessMessage);
        dispatch(importScoreMappingFileSuccess(response.data));
      })
      .catch(err => {
        toastMessage("error", err.response.data.error ? err.response.data.error : importScoreMappingFileFailMessage);
        dispatch(importScoreMappingFileFail(importScoreMappingFileFailMessage));
      });
  };
}