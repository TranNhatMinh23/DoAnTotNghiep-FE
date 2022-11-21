import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { 
  getAllArticlesFailMessage, 
  createNewArticleSuccessMessage,
  createNewArticleFailMessage,
  deleteArticleSuccessMessage,
  deleteArticleFailMessage,
  changeArticleStatusSuccessMessage,
  changeArticleStatusFailMessage,
  getArticleByIdFailMessage,
  editArticleSuccessMessage,
  editArticleFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';
import { message } from 'antd';

// GET_ALL_ARTICLES
const getAllArticlesSuccess = (data) => ({
  type: actionTypes.GET_ALL_ARTICLES.SUCCESS,
  data,
})

const getAllArticlesFail = (err) => ({
  type: actionTypes.GET_ALL_ARTICLES.FAIL,
  err,
})

export const getAllArticles = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_ARTICLES.PENDING });
    axios.get(`/api/articles`)
      .then((response) => {
        dispatch(getAllArticlesSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllArticlesFailMessage;
        dispatch(getAllArticlesFail(error));
        toastMessage("error", error);
      });
  };
}

//CREATE_NEW_ARTICLE
const createNewArticleSuccess = (data) => ({
  type: actionTypes.CREATE_NEW_ARTICLE.SUCCESS,
  data,
})

const createNewArticleFail = (err) => ({
  type: actionTypes.CREATE_NEW_ARTICLE.FAIL,
  err,
})

export const createNewArticle = (data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.CREATE_NEW_ARTICLE.PENDING });
    axios.post(`/api/articles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(createNewArticleSuccess(response.data));
        toastMessage("success", createNewArticleSuccessMessage);
      })
      .catch(err => { 
        let error = err.response ? err.response.data.error : createNewArticleFailMessage;
        dispatch(createNewArticleFail(error));
        toastMessage("error", error);
      });
  };
}

//DELETE_ARTICLE
const deleteArticleSuccess = (articleId) => ({
  type: actionTypes.DELETE_ARTICLE.SUCCESS,
  articleId,
})

const deleteArticleFail = (err) => ({
  type: actionTypes.DELETE_ARTICLE.FAIL,
  err,
})

export const deleteArticle = (articleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_ARTICLE.PENDING });
    axios.delete(`/api/articles/${articleId}`)
      .then((response) => {
        dispatch(deleteArticleSuccess(articleId));
        toastMessage("success", deleteArticleSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : deleteArticleFailMessage;
        dispatch(deleteArticleFail(error));
        toastMessage("error", error);
      });
  };
}

//CHANGE_ARTICLE_STATUS
const changeArticleStatusSuccess = (data) => ({
  type: actionTypes.CHANGE_ARTICLE_STATUS.SUCCESS,
  data
})

const changeArticleStatusFail = (err) => ({
  type: actionTypes.CHANGE_ARTICLE_STATUS.FAIL,
  err,
})

export const changeArticleStatus = (articleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_ARTICLE_STATUS.PENDING });
    axios.put(`/api/articles/${articleId}/status`)
      .then((response) => {
        dispatch(changeArticleStatusSuccess(response.data));
        message.success(changeArticleStatusSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : changeArticleStatusFailMessage;
        dispatch(changeArticleStatusFail(error));
        message.error(error);
      });
  };
}

//GET_ARTICLE_BY_ID
const getArticleByIdSuccess = (data) => ({
  type: actionTypes.GET_ARTICLE_BY_ID.SUCCESS,
  data,
})

const getArticleByIdFail = (err) => ({
  type: actionTypes.GET_ARTICLE_BY_ID.FAIL,
  err,
})

export const getArticleById = (articleId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ARTICLE_BY_ID.PENDING });
    axios.get(`/api/articles/${articleId}`)
      .then((response) => {
        dispatch(getArticleByIdSuccess(response.data));
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getArticleByIdFailMessage;
        dispatch(getArticleByIdFail(error));
        toastMessage("error", error);
      });
  };
}

//EDIT_ARTICLE
const editArticleSuccess = (data) => ({
  type: actionTypes.EDIT_ARTICLE.SUCCESS,
  data,
})

const editArticleFail = (err) => ({
  type: actionTypes.EDIT_ARTICLE.FAIL,
  err,
})

export const editArticle = (articleId, data) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append("data", JSON.stringify(data));
    if (data.image_preview) {
      formData.append('image', data.image_preview);
    }

    dispatch({ type: actionTypes.EDIT_ARTICLE.PENDING });
    axios.post(`/api/articles/${articleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(editArticleSuccess(response.data));
        toastMessage("success", editArticleSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editArticleFailMessage; 
        dispatch(editArticleFail(error));
        toastMessage("error", error);
      });
  };
}
