import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import { message } from 'antd';
import { 
  getAllUsersFailMessage, 
  createNewUserSuccessMessage,
  createNewUserFailMessage,
  deleteUserSuccessMessage,
  deleteUserFailMessage,
  toggleActiveUserStatusSuccessMessage,
  toggleActiveUserStatusFailMessage,
  editUserInfoSuccessMessage,
  editUserInfoFailMessage
} from '../../constants/messageResponse';

// GET_ALL_USERS
const getAllUsersSuccess = (data) => ({
  type: actionTypes.GET_ALL_USERS.SUCCESS,
  data,
})

const getAllUsersFail = (err) => ({
  type: actionTypes.GET_ALL_USERS.FAIL,
  err,
})

export const getAllUsers = () => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_ALL_USERS.PENDING });
    axios.get(`/api/users`)
      .then((response) => {
        dispatch(getAllUsersSuccess(response.data));
      })
      .catch(err => {
        dispatch(getAllUsersFail(getAllUsersFailMessage));
      });
  };
}

//CREATE_NEW_USER
const createNewUserSuccess = (data) => ({
  type: actionTypes.CREATE_NEW_USER.SUCCESS,
  data,
})

const createNewUserFail = (err) => ({
  type: actionTypes.CREATE_NEW_USER.FAIL,
  err,
})

export const createNewUser = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.CREATE_NEW_USER.PENDING });
    axios.post(`/api/users`, data)
      .then((response) => {
        message.success(createNewUserSuccessMessage);
        dispatch(createNewUserSuccess(response.data));
      })
      .catch(err => {
        let errorMessage = '';
        if(err.response.data.code === 422){
          if(err.response.data.error['email']) {
            errorMessage = err.response.data.error['email'];
          } else if (err.response.data.error['password']) {
            errorMessage = err.response.data.error['password'];
          } else {
            errorMessage = createNewUserFailMessage;
          }
        } else {
          errorMessage = createNewUserFailMessage;
        }
        message.error(errorMessage);
        dispatch(createNewUserFail(errorMessage));
      });
  };
}

//GET USER BY ID
const getUserByIdSuccess = (data) => ({
  type: actionTypes.GET_USER_BY_ID.SUCCESS,
  data
})

const getUserByIdFail = (err) => ({
  type: actionTypes.GET_USER_BY_ID.FAIL,
  err,
})

export const getUserById = (userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.GET_USER_BY_ID.PENDING });
    axios.get(`/api/users/${userId}`)
      .then((response) => {
        dispatch(getUserByIdSuccess(response.data));
      })
      .catch(err => {
        dispatch(getUserByIdFail(err.response.data.error));
      });
  };
}

//EDIT_USER_INFO
const editUserInfoSuccess = (data) => ({
  type: actionTypes.EDIT_USER_INFO.SUCCESS,
  data
});

const editUserInfoFail = (err) => ({
  type: actionTypes.EDIT_USER_INFO.FAIL,
  err,
});

export const editUserInfo = (userId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.EDIT_USER_INFO.PENDING });
    axios.put(`/api/users/${userId}`, data)
      .then((response) => {
        dispatch(editUserInfoSuccess(response.data));
        message.success(editUserInfoSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : editUserInfoFailMessage;
        dispatch(editUserInfoFail(error));
        message.error(error)
      });
  }
}

//DELETE USER
const deleteUserSuccess = (userId) => ({
  type: actionTypes.DELETE_USER.SUCCESS,
  userId
})

const deleteUserFail = (err) => ({
  type: actionTypes.DELETE_USER.FAIL,
  err,
})

export const deleteUser = (userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_USER.PENDING });
    axios.delete(`/api/users/${userId}`)
      .then((response) => {
        message.success(deleteUserSuccessMessage);
        dispatch(deleteUserSuccess(userId));
      })
      .catch(err => {
        let error =  err.response.data.error ? err.response.data.error : deleteUserFailMessage;
        message.error(error);
        dispatch(deleteUserFail(error));
      });
  };
}

//TOGGLE_ACTIVE_USER_STATUS
const toggleActiveUserStatusSuccess = (data) => ({
  type: actionTypes.TOGGLE_ACTIVE_USER_STATUS.SUCCESS,
  data
})

const toggleActiveUserStatusFail = (err) => ({
  type: actionTypes.TOGGLE_ACTIVE_USER_STATUS.FAIL,
  err,
})

export const toggleActiveUserStatus = (userId) => {
  return dispatch => {
    dispatch({ type: actionTypes.TOGGLE_ACTIVE_USER_STATUS.PENDING });
    axios.put(`/api/users/${userId}/status`)
      .then((response) => {
        message.success(toggleActiveUserStatusSuccessMessage);
        dispatch(toggleActiveUserStatusSuccess(response.data));
      })
      .catch(err => {
        message.error(toggleActiveUserStatusFailMessage);
        dispatch(toggleActiveUserStatusFail(toggleActiveUserStatusFailMessage));
      });
  };
}