import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api'; 
import { 
  getAllSlidesFailMessage, 
  addSlideSuccessMessage, 
  addSlideFailMessage, 
  deleteSlideSuccessMessage,
  deleteSlideFailMessage,
  changeSlideStatusSuccessMessage,
  changeSlideStatusFailMessage,
  getSlideByIdFailMessage,
  editSlideSuccessMessage,
  editSlideFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';
import { message } from 'antd';

// GET_ALL_SLIDE
const getAllSlidesSuccess = (data) => ({
  type: actionTypes.GET_ALL_SLIDE.SUCCESS,
  data,
})

const getAllSlidesFail = (err) => ({
  type: actionTypes.GET_ALL_SLIDE.FAIL,
  err,
})

export const getAllSlides = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_SLIDE.PENDING });
    axios.get(`/api/slides`)
      .then((response) => {
        dispatch(getAllSlidesSuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllSlidesFail(getAllSlidesFailMessage));
      });
  };
}

//ADD_SLIDE
const addSlideSuccess = (data) => ({
  type: actionTypes.ADD_SLIDE.SUCCESS,
  data,
})

const addSlideFail = (err) => ({
  type: actionTypes.ADD_SLIDE.FAIL,
  err,
})

export const addSlide = (data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.slide) {
      formData.append('image', data.slide);
    }

    dispatch({ type: actionTypes.ADD_SLIDE.PENDING });
    axios.post(`/api/slides`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(addSlideSuccess(response.data));
        toastMessage("success", addSlideSuccessMessage);
      })
      .catch(err => { 
        let error = err.response ? err.response.data.error : addSlideFailMessage;
        dispatch(addSlideFail(error));
        toastMessage("error", error);
      });
  };
}

//DELETE SLIDE
const deleteSlideSuccess = (slideId) => ({
  type: actionTypes.DELETE_SLIDE.SUCCESS,
  slideId
})

const deleteSlideFail = (err) => ({
  type: actionTypes.DELETE_SLIDE.FAIL,
  err,
})

export const deleteSlide = (slideId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_SLIDE.PENDING });
    axios.delete(`/api/slides/${slideId}`)
      .then((response) => {
        dispatch(deleteSlideSuccess(slideId));
        toastMessage("success", deleteSlideSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : deleteSlideFailMessage;
        dispatch(deleteSlideFail(error));
        toastMessage("error", error);
      });
  };
}

//CHANGE_SLIDE_STATUS
const changeSlideStatusSuccess = (slideId) => ({
  type: actionTypes.CHANGE_SLIDE_STATUS.SUCCESS,
  slideId
})

const changeSlideStatusFail = (err) => ({
  type: actionTypes.CHANGE_SLIDE_STATUS.FAIL,
  err,
})

export const changeSlideStatus = (slideId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_SLIDE_STATUS.PENDING });
    axios.put(`/api/slides/${slideId}/status`)
      .then((response) => {
        dispatch(changeSlideStatusSuccess(slideId));
        message.success(changeSlideStatusSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : changeSlideStatusFailMessage;
        dispatch(changeSlideStatusFail(error));
        message.error(error);
      });
  };
}

//GET_SLIDE_BY_ID
const getSlideByIdSuccess = (data) => ({
  type: actionTypes.GET_SLIDE_BY_ID.SUCCESS,
  data,
})

const getSlideByIdFail = (err) => ({
  type: actionTypes.GET_SLIDE_BY_ID.FAIL,
  err,
})

export const getSlideById = (slideId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_SLIDE_BY_ID.PENDING });
    axios.get(`/api/slides/${slideId}`)
      .then((response) => {
        dispatch(getSlideByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getSlideByIdFailMessage;
        dispatch(getSlideByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//EDIT_SLIDE
const editSlideSuccess = (data) => ({
  type: actionTypes.EDIT_SLIDE.SUCCESS,
  data,
})

const editSlideFail = (err) => ({
  type: actionTypes.EDIT_SLIDE.FAIL,
  err,
})

export const editSlide = (slideId, data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.EDIT_SLIDE.PENDING });
    axios.post(`/api/slides/${slideId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(editSlideSuccess(response.data));
        toastMessage("success", editSlideSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editSlideFailMessage; 
        dispatch(editSlideFail(error));
        toastMessage("error", error);
      });
  };
}