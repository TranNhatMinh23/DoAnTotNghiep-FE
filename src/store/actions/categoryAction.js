import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { 
  getAllCategoryFailMessage, 
  addNewCategorySuccessMessage, 
  addNewCategoryFailMessage,
  deleteCategorySuccessMessage,
  deleteCategoryFailMessage,
  editCategorySuccessMessage,
  editCategoryFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';
import { message } from 'antd';

// GET_ALL_CATEGORY
const getAllCategorySuccess = (data) => ({
  type: actionTypes.GET_ALL_CATEGORY.SUCCESS,
  data,
})

const getAllCategoryFail = (err) => ({
  type: actionTypes.GET_ALL_CATEGORY.FAIL,
  err,
})

export const getAllCategory = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_CATEGORY.PENDING });
    axios.get(`/api/categories`)
      .then((response) => {
        dispatch(getAllCategorySuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllCategoryFailMessage;
        dispatch(getAllCategoryFail(error));
        toastMessage("error", error);
      });
  };
}

//ADD_NEW_CATEGORY
const addNewCategorySuccess = (data) => ({
  type: actionTypes.ADD_NEW_CATEGORY.SUCCESS,
  data,
})

const addNewCategoryFail = (err) => ({
  type: actionTypes.ADD_NEW_CATEGORY.FAIL,
  err,
})

export const addNewCategory = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_NEW_CATEGORY.PENDING });
    axios.post(`/api/categories`, data)
      .then((response) => {
        dispatch(addNewCategorySuccess(response.data));
        message.success(addNewCategorySuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error['name'] : addNewCategoryFailMessage;
        dispatch(addNewCategoryFail(error));
        message.error(error);
      });
  };
}

export const resetStatusCreatedNewCategory = () => ({
  type: actionTypes.RESET_STATUS_CREATED_CATEGORY
});

//DELETE_CATEGORY
const deleteCategorySuccess = (categoryId) => ({
  type: actionTypes.DELETE_CATEGORY.SUCCESS,
  categoryId
})

const deleteCategoryFail = (err) => ({
  type: actionTypes.DELETE_CATEGORY.FAIL,
  err,
})

export const deleteCategory = (categoryId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_CATEGORY.PENDING });
    axios.delete(`/api/categories/${categoryId}`)
      .then((response) => {
        dispatch(deleteCategorySuccess(categoryId));
        toastMessage("success", deleteCategorySuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : deleteCategoryFailMessage;
        dispatch(deleteCategoryFail(error));
        toastMessage("error", error);
      });
  };
}

//EDIT_CATEGORY
const editCategorySuccess = (data) => ({
  type: actionTypes.EDIT_CATEGORY.SUCCESS,
  data,
})

const editCategoryFail = (err) => ({
  type: actionTypes.EDIT_CATEGORY.FAIL,
  err,
})

export const editCategory = (categoryId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.EDIT_CATEGORY.PENDING });
    axios.put(`/api/categories/${categoryId}`, data)
      .then((response) => {
        dispatch(editCategorySuccess(response.data));
        message.success(editCategorySuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editCategoryFailMessage;
        if(err.response.data.error['name']) {
          error = err.response.data.error['name'];
        }
        if(err.response.data.error['description']) {
          error = err.response.data.error['description'];
        }
        dispatch(editCategoryFail(error));
        message.error(error);
      });
  };
}