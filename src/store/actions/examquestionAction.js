import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import {
  getAllExamQuestionsFailMessage, 
  createNewExamQuestionFailMessage,
  createNewExamQuestionSuccessMessage,
  deleteExamQuestionFailMessage,
  deleteExamQuestionSuccessMessage,
  getExamQuestionByIdFailMessage,
  editExamQuestionInfoFailMessage,
  editExamQuestionInfoSuccessMessage,
  uploadAudioForTestSuccessMessage,
  uploadAudioForTestFailMessage,
  getAllExamQuestionsOfSystemForCompanyFailMessage,
} from '../../constants/messageResponse';
import { message } from 'antd';
import { toastMessage } from '../../shared/utils';

//GET_ALL_EXAM_QUESTIONS
const getAllExamQuestionsSuccess = (data) => ({
  type: actionTypes.GET_ALL_EXAM_QUESTIONS.SUCCESS,
  data,
})

const getAllExamQuestionsFail = (err) => ({
  type: actionTypes.GET_ALL_EXAM_QUESTIONS.FAIL,
  err,
})

export const getAllExamQuestions = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_EXAM_QUESTIONS.PENDING });
    axios.get(`/api/exam_questions`)
      .then((response) => {
        dispatch(getAllExamQuestionsSuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllExamQuestionsFail(getAllExamQuestionsFailMessage));
      });
  };
}

//CREATE_NEW_EXAM_QUESTION
const createNewExamQuestionSuccess = (data) => ({
  type: actionTypes.CREATE_NEW_EXAM_QUESTION.SUCCESS,
  data,
})

const createNewExamQuestionFail = (err) => ({
  type: actionTypes.CREATE_NEW_EXAM_QUESTION.FAIL,
  err,
})

export const createNewExamQuestion = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.CREATE_NEW_EXAM_QUESTION.PENDING });
    axios.post(`/api/exam_questions`, data)
      .then((response) => {
        dispatch(createNewExamQuestionSuccess(response.data));
        message.success(createNewExamQuestionSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error['name'] : createNewExamQuestionFailMessage;
        dispatch(createNewExamQuestionFail(error));
        message.error(error);
      });
  };
}

export const resetStatusCreatedNewExamQuestion = () => ({
  type: actionTypes.RESET_STATUS_CREATED_EXAM_QUESTION
});

//DELETE_EXAM_QUESTION
const deleteExamQuestionSuccess = (examQuestionId) => ({
  type: actionTypes.DELETE_EXAM_QUESTION.SUCCESS,
  examQuestionId,
})

const deleteExamQuestionFail = (err) => ({
  type: actionTypes.DELETE_EXAM_QUESTION.FAIL,
  err,
})

export const deleteExamQuestion = (examQuestionId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_EXAM_QUESTION.PENDING });
    axios.delete(`/api/exam_questions/${examQuestionId}`)
      .then((response) => {
        message.success(deleteExamQuestionSuccessMessage);
        dispatch(deleteExamQuestionSuccess(examQuestionId));
      })
      .catch(err => {
        message.error(deleteExamQuestionFailMessage);
        dispatch(deleteExamQuestionFail(deleteExamQuestionFailMessage));
      });
  };
}

//GET_EXAM_QUESTION_BY_ID
const getExamQuestionByIdSuccess = (data) => ({
  type: actionTypes.GET_EXAM_QUESTION_BY_ID.SUCCESS,
  data,
})

const getExamQuestionByIdFail = (err) => ({
  type: actionTypes.GET_EXAM_QUESTION_BY_ID.FAIL,
  err,
})

export const getExamQuestionById = (examQuestionId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_EXAM_QUESTION_BY_ID.PENDING });
    axios.get(`/api/exam_questions/${examQuestionId}`)
      .then((response) => {
        dispatch(getExamQuestionByIdSuccess(response.data));
      })
      .catch(err => {
        dispatch(getExamQuestionByIdFail(getExamQuestionByIdFailMessage));
      });
  };
}

//EDIT_EXAM_QUESTION_INFO
const editExamQuestionInfoSuccess = (data) => ({
  type: actionTypes.EDIT_EXAM_QUESTION_INFO.SUCCESS,
  data,
})

const editExamQuestionInfoFail = (err) => ({
  type: actionTypes.EDIT_EXAM_QUESTION_INFO.FAIL,
  err,
})

export const editExamQuestionInfo = (examQuestionId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.EDIT_EXAM_QUESTION_INFO.PENDING });
    axios.put(`/api/exam_questions/${examQuestionId}`, data)
      .then((response) => {
        dispatch(editExamQuestionInfoSuccess(response.data));
        toastMessage("success", editExamQuestionInfoSuccessMessage);
      })
      .catch(err => {
        let error = err.response.data.error ? err.response.data.error : editExamQuestionInfoFailMessage;
        dispatch(editExamQuestionInfoFail(error));
        toastMessage("error", error);
      });
  };
}

//UPLOAD_AUDIO_FOR_TEST
const uploadAudioForTestSuccess = (data) => ({
  type: actionTypes.UPLOAD_AUDIO_FOR_TEST.SUCCESS,
  data,
})

const uploadAudioForTestFail = (err) => ({
  type: actionTypes.UPLOAD_AUDIO_FOR_TEST.FAIL,
  err,
})

export const uploadAudioForTest = (examQuestionId, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('audio', files);
    dispatch({ type: actionTypes.UPLOAD_AUDIO_FOR_TEST.PENDING });
    axios.post(`/api/exam_questions/${examQuestionId}/audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(uploadAudioForTestSuccess(response.data.url));
        toastMessage("success", uploadAudioForTestSuccessMessage);
      })
      .catch(err => {
        dispatch(uploadAudioForTestFail(uploadAudioForTestFailMessage));
        toastMessage("error", uploadAudioForTestFailMessage);
      });
  };
}

//GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY
const getAllExamQuestionsOfSystemForCompanySuccess = (data) => ({
  type: actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.SUCCESS,
  data,
})

const getAllExamQuestionsOfSystemForCompanyFail = (err) => ({
  type: actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.FAIL,
  err,
})

export const getAllExamQuestionsOfSystemForCompany = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_EXAM_QUESTION_OF_SYSTEM_FOR_COMPANY.PENDING });
    axios.get(`/api/exam_question/for_company`)
      .then((response) => {
        dispatch(getAllExamQuestionsOfSystemForCompanySuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllExamQuestionsOfSystemForCompanyFail(getAllExamQuestionsOfSystemForCompanyFailMessage));
      });
  };
}