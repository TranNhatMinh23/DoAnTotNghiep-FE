import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { toastMessage } from '../../shared/utils';  
import { 
  getInfoHomeClientFailMessage, 
  getAllArticleClientFailMessage, 
  viewDetailArticleClientByIdFailMessage
} from '../../constants/messageResponseClient';

//GET_INFO_HOME_CLIENT
const getInfoHomeClientSuccess = (data) => ({
  type: actionTypes.GET_INFO_HOME_CLIENT.SUCCESS,
  data
});

const getInfoHomeClientFail = (err) => ({
  type: actionTypes.GET_INFO_HOME_CLIENT.FAIL,
  err,
});

export const getInfoHomeClient = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_INFO_HOME_CLIENT.PENDING });
    axios.get(`/api/client/homes`)
      .then((response) => { 
        dispatch(getInfoHomeClientSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getInfoHomeClientFailMessage;
        dispatch(getInfoHomeClientFail(error));
        toastMessage("error", error);
      });
  }
}

//GET_ALL_ARTICLE_CLIENT
const getAllArticleClientSuccess = (data) => ({
  type: actionTypes.GET_ALL_ARTICLE_CLIENT.SUCCESS,
  data
});

const getAllArticleClientFail = (err) => ({
  type: actionTypes.GET_ALL_ARTICLE_CLIENT.FAIL,
  err,
});

export const getAllArticleClient = (type, page = 1) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_ARTICLE_CLIENT.PENDING });
    axios.get(`/api/client/articles?type=${type}&page=${page}`)
      .then((response) => { 
        dispatch(getAllArticleClientSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : getAllArticleClientFailMessage;
        dispatch(getAllArticleClientFail(error));
        toastMessage("error", error);
      });
  }
}

//VIEW_DETAIL_ARTICLE_CLIENT
const viewDetailArticleClientByIdSuccess = (data) => ({
  type: actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.SUCCESS,
  data
});

const viewDetailArticleClientByIdFail = (err) => ({
  type: actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.FAIL,
  err,
});

export const viewDetailArticleClientById = (id) => {
  return dispatch => {
    dispatch({ type: actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.PENDING });
    axios.get(`/api/client/articles/${id}`)
      .then((response) => { 
        dispatch(viewDetailArticleClientByIdSuccess(response.data)); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : viewDetailArticleClientByIdFailMessage;
        dispatch(viewDetailArticleClientByIdFail(error));
        toastMessage("error", error);
      });
  }
}