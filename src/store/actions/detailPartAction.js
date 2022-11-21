import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import {
  getDetailInfoPartFailMessage,
  uploadExampleImageFailMessage,
  uploadExampleImageSuccessMessage,
  deleteExampleImageFailMessage,
  deleteExampleImageSuccessMessage,
  updateAnswerExampleSuccessMessage,
  updateAnswerExampleFailMessage,
  updateQuestionSuccessMessage,
  updateQuestionFailMessage,
  uploadQuestionImageSuccessMessage,
  uploadQuestionImageFailMessage,
  deleteQuestionImageSuccessMessage,
  deleteQuestionImageFailMessage,
  uploadParagraphImageSuccessMessage,
  uploadParagraphImageFailMessage,
  deleteParagraphImageSuccessMessage,
  deleteParagraphImageFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';

// GET_DETAIL_INFO_PART
const getDetailInfoPartSuccess = (data) => ({
  type: actionTypes.GET_DETAIL_INFO_PART.SUCCESS,
  data,
})

const getDetailInfoPartFail = (err) => ({
  type: actionTypes.GET_DETAIL_INFO_PART.FAIL,
  err,
})

export const getDetailInfoPart = (partId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_DETAIL_INFO_PART.PENDING });
    axios.get(`/api/parts/${partId}`)
      .then((response) => {
        dispatch(getDetailInfoPartSuccess(response.data));
      })
      .catch(err => {
        dispatch(getDetailInfoPartFail(getDetailInfoPartFailMessage));
      });
  };
}

//UPLOAD_EXAMPLE_IMAGE_FOR_PART
const uploadExampleImageSuccess = (data) => ({
  type: actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.SUCCESS,
  data,
})

const uploadExampleImageFail = (err) => ({
  type: actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.FAIL,
  err,
})

export const uploadExampleImage = (partId, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', files);
    dispatch({ type: actionTypes.UPLOAD_EXAMPLE_IMAGE_FOR_PART.PENDING });
    axios.post(`/api/parts/${partId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(uploadExampleImageSuccess(response.data.url));
        toastMessage("success", uploadExampleImageSuccessMessage);
      })
      .catch(err => {
        dispatch(uploadExampleImageFail(uploadExampleImageFailMessage));
        toastMessage("error", uploadExampleImageFailMessage);
      });
  };
}

//DELETE_EXAMPLE_IMAGE
const deleteExampleImageSuccess = (data) => ({
  type: actionTypes.DELETE_EXAMPLE_IMAGE.SUCCESS,
  data,
})

const deleteExampleImageFail = (err) => ({
  type: actionTypes.DELETE_EXAMPLE_IMAGE.FAIL,
  err,
})

export const deleteExampleImage = (partId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_EXAMPLE_IMAGE.PENDING });
    axios.delete(`/api/parts/image/${partId}`)
      .then((response) => {
        dispatch(deleteExampleImageSuccess(response.data));
        toastMessage("success", deleteExampleImageSuccessMessage);
      })
      .catch(err => {
        dispatch(deleteExampleImageFail(deleteExampleImageFailMessage));
        toastMessage("error", deleteExampleImageFailMessage);
      });
  };
}

//UPDATE_ANSWER_EXAMPLE
const updateAnswerExampleSuccess = (data) => ({
  type: actionTypes.UPDATE_ANSWER_EXAMPLE.SUCCESS,
  data,
})

const updateAnswerExampleFail = (err) => ({
  type: actionTypes.UPDATE_ANSWER_EXAMPLE.FAIL,
  err,
})

export const updateAnswerExample = (partId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_ANSWER_EXAMPLE.PENDING });
    axios.put(`/api/parts/${partId}`, data)
      .then((response) => {
        dispatch(updateAnswerExampleSuccess(data));
        toastMessage("success", updateAnswerExampleSuccessMessage);
      })
      .catch(err => {
        dispatch(updateAnswerExampleFail(updateAnswerExampleFailMessage));
        toastMessage("error", updateAnswerExampleFailMessage);
      });
  };
}

//UPDATE_QUESTION
const updateQuestionSuccess = (data) => ({
  type: actionTypes.UPDATE_QUESTION.SUCCESS,
  data,
})

const updateQuestionFail = (err) => ({
  type: actionTypes.UPDATE_QUESTION.FAIL,
  err,
})

export const updateQuestion = (questionId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_QUESTION.PENDING });
    axios.put(`/api/questions/${questionId}`, data)
      .then((response) => { 
        dispatch(updateQuestionSuccess(response.data));
        toastMessage("success", updateQuestionSuccessMessage);
      })
      .catch(err => {
        dispatch(updateQuestionFail(updateQuestionFailMessage));
        toastMessage("error", updateQuestionFailMessage);
      });
  };
}

//UPLOAD_QUESTION_IMAGE
const uploadQuestionImageSuccess = (questionId, data) => ({
  type: actionTypes.UPLOAD_QUESTION_IMAGE.SUCCESS,
  questionId,
  data,
})

const uploadQuestionImageFail = (err) => ({
  type: actionTypes.UPLOAD_QUESTION_IMAGE.FAIL,
  err,
})

export const uploadQuestionImage = (questionId, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', files);
    dispatch({ type: actionTypes.UPLOAD_QUESTION_IMAGE.PENDING });
    axios.post(`/api/questions/${questionId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(uploadQuestionImageSuccess(questionId, response.data.url));
        toastMessage("success", uploadQuestionImageSuccessMessage);      
      })
      .catch(err => {
        dispatch(uploadQuestionImageFail(uploadQuestionImageFailMessage));
        toastMessage("error", uploadQuestionImageFailMessage);
      });
  };
}

//DELETE_QUESTION_IMAGE
const deleteQuestionImageSuccess = (questionId) => ({
  type: actionTypes.DELETE_QUESTION_IMAGE.SUCCESS,
  questionId,
})

const deleteQuestionImageFail = (err) => ({
  type: actionTypes.DELETE_QUESTION_IMAGE.FAIL,
  err,
})

export const deleteQuestionImage = (questionId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_QUESTION_IMAGE.PENDING });
    axios.delete(`/api/questions/${questionId}/image`)
      .then((response) => {
        dispatch(deleteQuestionImageSuccess(questionId));
        toastMessage("success", deleteQuestionImageSuccessMessage);
      })
      .catch(err => {
        dispatch(deleteQuestionImageFail(deleteQuestionImageFailMessage));
        toastMessage("error", deleteQuestionImageFailMessage);
      });
  };
}

//UPLOAD_PARAGRAPH_IMAGE
const uploadParagraphImageSuccess = (questionId, paragraphNo, data) => ({
  type: actionTypes.UPLOAD_PARAGRAPH_IMAGE.SUCCESS,
  questionId,
  paragraphNo,
  data,
})

const uploadParagraphImageFail = (err) => ({
  type: actionTypes.UPLOAD_PARAGRAPH_IMAGE.FAIL,
  err,
})

export const uploadParagraphImage = (questionId, paragraphNo, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', files);
    dispatch({ type: actionTypes.UPLOAD_PARAGRAPH_IMAGE.PENDING });
    axios.post(`/api/questions/${questionId}/paragraph-image/${paragraphNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(uploadParagraphImageSuccess(questionId, paragraphNo, response.data.url));
        toastMessage("success", uploadParagraphImageSuccessMessage);      
      })
      .catch(err => {
        dispatch(uploadParagraphImageFail(uploadParagraphImageFailMessage));
        toastMessage("error", uploadParagraphImageFailMessage);
      });
  };
}

//DELETE_PARAGRAPH_IMAGE
const deleteParagraphImageSuccess = (questionId, paragraphNo) => ({
  type: actionTypes.DELETE_PARAGRAPH_IMAGE.SUCCESS,
  questionId,
  paragraphNo
})

const deleteParagraphImageFail = (err) => ({
  type: actionTypes.DELETE_PARAGRAPH_IMAGE.FAIL,
  err,
})

export const deleteParagraphImage = (questionId, paragraphNo) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_PARAGRAPH_IMAGE.PENDING });
    axios.delete(`/api/questions/${questionId}/paragraph-image/${paragraphNo}`)
      .then((response) => {
        dispatch(deleteParagraphImageSuccess(questionId, paragraphNo));
        toastMessage("success", deleteParagraphImageSuccessMessage);
      })
      .catch(err => {
        dispatch(deleteParagraphImageFail(deleteParagraphImageFailMessage));
        toastMessage("error", deleteParagraphImageFailMessage);
      });
  };
}

//CHANGE_STATUS_IS_FIRST_GROUP_QUESTION
export const changeStateIsFirstGroupQuestion = (questionId) => ({
  type: actionTypes.CHANGE_STATUS_IS_FIRST_GROUP_QUESTION,
  questionId,
})
 