import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';
import { 
  getAllSampleExamsFailMessage, 
  createSampleExamSuccessMessage, 
  createSampleExamFailMessage,
  getSampleExamByIdFailMessage,
  editSampleExamSuccessMessage,
  editSampleExamFailMessage,
  deleteSampleExamSuccessMessage,
  deleteSampleExamFailMessage,
  changeStatusSampleExamSuccessMessage,
  changeStatusSampleExamFailMessage,
  changeViewAnswerStatusSuccessMessage,
  changeViewAnswerStatusFailMessage
} from '../../constants/messageResponse';
import { message } from 'antd';

//GET_ALL_SAMPLE_EXAMS
const getAllSampleExamsSuccess = (data) => ({
  type: actionTypes.GET_ALL_SAMPLE_EXAMS.SUCCESS,
  data,
})

const getAllSampleExamsFail = (err) => ({
  type: actionTypes.GET_ALL_SAMPLE_EXAMS.FAIL,
  err,
})

export const getAllSampleExams = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_SAMPLE_EXAMS.PENDING });
    axios.get(`/api/sample_exams`)
      .then((response) => {
        dispatch(getAllSampleExamsSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllSampleExamsFailMessage;
        dispatch(getAllSampleExamsFail(error));
        toastMessage("error", error);
      });
  };
}

//CREATE_SAMPLE_EXAM
const createSampleExamSuccess = (data) => ({
  type: actionTypes.CREATE_SAMPLE_EXAM.SUCCESS,
  data,
})

const createSampleExamFail = (err) => ({
  type: actionTypes.CREATE_SAMPLE_EXAM.FAIL,
  err,
})

export const createSampleExam = (data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.CREATE_SAMPLE_EXAM.PENDING });
    axios.post(`/api/sample_exams`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(createSampleExamSuccess(response.data));
        toastMessage("success", createSampleExamSuccessMessage);
      })
      .catch(err => { 
        let error = err.response ? err.response.data.error : createSampleExamFailMessage;
        dispatch(createSampleExamFail(error));
        toastMessage("error", error);
      });
  };
}

//GET_SAMPLE_EXAM_BY_ID
const getSampleExamByIdSuccess = (data) => ({
  type: actionTypes.GET_SAMPLE_EXAM_BY_ID.SUCCESS,
  data,
})

const getSampleExamByIdFail = (err) => ({
  type: actionTypes.GET_SAMPLE_EXAM_BY_ID.FAIL,
  err,
})

export const getSampleExamById = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_SAMPLE_EXAM_BY_ID.PENDING });
    axios.get(`/api/sample_exams/${sampleExamId}`)
      .then((response) => {
        dispatch(getSampleExamByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getSampleExamByIdFailMessage;
        dispatch(getSampleExamByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//EDIT_SAMPLE_EXAM
const editSampleExamSuccess = (data) => ({
  type: actionTypes.EDIT_SAMPLE_EXAM.SUCCESS,
  data,
})

const editSampleExamFail = (err) => ({
  type: actionTypes.EDIT_SAMPLE_EXAM.FAIL,
  err,
})

export const editSampleExam = (sampleExamId, data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.EDIT_SAMPLE_EXAM.PENDING });
    axios.post(`/api/sample_exams/${sampleExamId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(editSampleExamSuccess(response.data));
        toastMessage("success", editSampleExamSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editSampleExamFailMessage; 
        dispatch(editSampleExamFail(error));
        toastMessage("error", error);
      });
  };
}

//DELETE_SAMPLE_EXAM
const deleteSampleExamSuccess = (sampleExamId) => ({
  type: actionTypes.DELETE_SAMPLE_EXAM.SUCCESS,
  sampleExamId,
})

const deleteSampleExamFail = (err) => ({
  type: actionTypes.DELETE_SAMPLE_EXAM.FAIL,
  err,
})

export const deleteSampleExam = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_SAMPLE_EXAM.PENDING });
    axios.delete(`/api/sample_exams/${sampleExamId}`)
      .then((response) => {
        dispatch(deleteSampleExamSuccess(sampleExamId));
        toastMessage("success", deleteSampleExamSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : deleteSampleExamFailMessage;
        dispatch(deleteSampleExamFail(error));
        toastMessage("error", error);
      });
  };
}

//CHANGE_STATUS_SAMPLE_EXAM
const changeStatusSampleExamSuccess = (data) => ({
  type: actionTypes.CHANGE_STATUS_SAMPLE_EXAM.SUCCESS,
  data
})

const changeStatusSampleExamFail = (err) => ({
  type: actionTypes.CHANGE_STATUS_SAMPLE_EXAM.FAIL,
  err,
})

export const changeStatusSampleExam = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_STATUS_SAMPLE_EXAM.PENDING });
    axios.put(`/api/sample_exams/${sampleExamId}/status`)
      .then((response) => {
        dispatch(changeStatusSampleExamSuccess(response.data));
        message.success(changeStatusSampleExamSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : changeStatusSampleExamFailMessage;
        dispatch(changeStatusSampleExamFail(error));
        message.error(error);
      });
  };
}

//CHANGE VIEW ANSWER STATUS 
const changeViewAnswerStatusSuccess = (data) => ({
  type: actionTypes.CHANGE_VIEW_ANSWER_STATUS.SUCCESS,
  data
})

const changeViewAnswerStatusFail = (err) => ({
  type: actionTypes.CHANGE_VIEW_ANSWER_STATUS.FAIL,
  err,
})

export const changeViewAnswerStatus = (sampleExamId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_VIEW_ANSWER_STATUS.PENDING }); 
    axios.put(`/api/sample_exams/${sampleExamId}/is_view_answers`)
      .then((response) => {
        dispatch(changeViewAnswerStatusSuccess(response.data));
        message.success(changeViewAnswerStatusSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : changeViewAnswerStatusFailMessage;
        dispatch(changeViewAnswerStatusFail(error));
        message.error(error);
      });
  };
}

