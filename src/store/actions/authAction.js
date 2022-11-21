import * as actionTypes from '../../constants/actionTypes';
import axios from '../../shared/api';
import history from '../../history';
import {
  loginFailMessage, 
  updateInfoFailMessage,
  updateInfoSuccessMessage,
  updatePasswordSuccessMessage,
  updatePasswordFailMessage,
  updateAvatarSuccessMessage,
  updateAvatarFailMessage,
  signupForCompanySuccessMessage,
  signupForCompanyFailMessage,
  signupForPersonalSuccessMessage,
  signupForPersonalFailMessage
} from '../../constants/messageResponse';
import { toastMessage } from '../../shared/utils';

//LOGIN
const loginSuccess = (data) => ({
  type: actionTypes.LOGIN.SUCCESS,
  data
});

const loginFail = (err) => ({
  type: actionTypes.LOGIN.FAIL,
  err,
});

export const login = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.LOGIN.PENDING });
    axios.post('/api/login', data)
      .then((response) => {
        const bearerToken = `Bearer ${response.data.token}`;
        axios.defaults.headers.common['Authorization'] = bearerToken;
        dispatch(loginSuccess(response.data));
        history.push('/'); 
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : loginFailMessage;
        toastMessage("error", error)
        dispatch(loginFail(error));
      });
  }
}

//LOG OUT
const logoutSuccess = () => ({
  type: actionTypes.LOGOUT.SUCCESS,
})

export const logout = () => {
  delete axios.defaults.headers.common['Authorization'];
  return dispatch => {
    dispatch(logoutSuccess());
  }
}

//clearCacheLogin
export const clearCacheLogin = () => ({
  type: actionTypes.CLEAR_CACHE_LOGIN
})

//SIGN_UP_FOR_PESONAL
const signupForPersonalSuccess = (data) => ({
  type: actionTypes.SIGN_UP_FOR_PESONAL.SUCCESS,
  data
});

const signupForPersonalFail = (err) => ({
  type: actionTypes.SIGN_UP_FOR_PESONAL.FAIL,
  err,
});

export const signupForPersonal = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.SIGN_UP_FOR_PESONAL.PENDING });
    axios.post('/api/signup/personal', data)
      .then((response) => {
        let mess = response.data ? response.data.message : signupForPersonalSuccessMessage;
        dispatch(signupForPersonalSuccess(response.data));
        toastMessage("success", mess);
      })
      .catch(err => {
        let error = signupForPersonalFailMessage;
        let listErr = err.response ? err.response.data.error : null;
        if (listErr) {
          if (listErr.email) {
            error = listErr.email[0];
          } else if (listErr.password) {
            error = listErr.password[0];
          }
        }
        dispatch(signupForPersonalFail(error));
        toastMessage("error", error)
      });
  }
}

//SIGN_UP_FOR_COMPANY
const signupForCompanySuccess = (data) => ({
  type: actionTypes.SIGN_UP_FOR_COMPANY.SUCCESS,
  data
});

const signupForCompanyFail = (err) => ({
  type: actionTypes.SIGN_UP_FOR_COMPANY.FAIL,
  err,
});

export const signupForCompany = (data) => {
  return dispatch => {
    dispatch({ type: actionTypes.SIGN_UP_FOR_COMPANY.PENDING });
    axios.post('/api/signup/company', data)
      .then((response) => {
        let mess = response.data ? response.data.message : signupForCompanySuccessMessage;
        dispatch(signupForCompanySuccess(response.data));
        toastMessage("success", mess);
      })
      .catch(err => {
        let error = signupForCompanyFailMessage;
        let listErr = err.response ? err.response.data.error : null;
        if (listErr) {
          if (listErr.email) {
            error = listErr.email[0];
          } else if (listErr.password) {
            error = listErr.password[0];
          } else if (listErr.company_name) {
            error = listErr.company_name[0];
          } else if (listErr.address) {
            error = listErr.address[0];
          } else if (listErr.phone) {
            error = listErr.phone[0];
          }
        }
        dispatch(signupForCompanyFail(error));
        toastMessage("error", error)
      });
  }
}

//UPDATE INFOMATION
const updateInfoSuccess = (data) => ({
  type: actionTypes.UPDATE_INFO.SUCCESS,
  data
});

const updateInfoFail = (err) => ({
  type: actionTypes.UPDATE_INFO.FAIL,
  err,
});

export const updateInfo = (userId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_INFO.PENDING });
    axios.put(`/api/users/${userId}`, data)
      .then((response) => {
        dispatch(updateInfoSuccess(response.data));
        toastMessage("success", updateInfoSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updateInfoFailMessage;
        dispatch(updateInfoFail(error));
        toastMessage("error", error)
      });
  }
}

//UPDATE PASWORD
const updatePasswordSuccess = () => ({
  type: actionTypes.UPDATE_PASSWORD.SUCCESS
});

const updatePasswordFail = (err) => ({
  type: actionTypes.UPDATE_PASSWORD.FAIL,
  err,
});

export const updatePassword = (userId, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_PASSWORD.PENDING });
    axios.put(`/api/users/${userId}`, data)
      .then((response) => {
        dispatch(updatePasswordSuccess());
        toastMessage("success", updatePasswordSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updatePasswordFailMessage;
        dispatch(updatePasswordFail(error));
        toastMessage("error", error);
      });
  }
}

//UPDATED AVATAR
const updateAvatarSuccess = (data) => ({
  type: actionTypes.UPDATE_AVATAR.SUCCESS,
  data
});

const updateAvatarFail = (err) => ({
  type: actionTypes.UPDATE_AVATAR.FAIL,
  err,
});

export const updateAvatar = (userId, files) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('image', files);
    dispatch({ type: actionTypes.UPDATE_AVATAR.PENDING });
    axios.post(`/api/users/${userId}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then((response) => {
        dispatch(updateAvatarSuccess(response.data));
        toastMessage("success", updateAvatarSuccessMessage);
      })
      .catch(err => {
        let error = err.response ? err.response.data.error : updateAvatarFailMessage;
        dispatch(updateAvatarFail(error));
        toastMessage("error", error);
      });
  }
}

//set authenticate header axios
export const setAuthorizationToken = () => {
  return (dispatch, getState) => {
    const token = getState().authReducer.userInfo ? getState().authReducer.userInfo.token : '';
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}