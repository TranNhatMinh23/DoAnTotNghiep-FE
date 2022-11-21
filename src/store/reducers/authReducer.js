import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: null,
  isAuthenticated: false,
  userInfo: null,
  signupStatus: false,
  signupResponse: null,
  isLoadingUploadAvatar: false,
  isLoadingUpdate: false,
  isLoadingUpdateCompanyInfo: false
};

//LOGIN
const loginPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: null,
    isAuthenticated: false,
    userInfo: null
  });
}

const loginSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    isAuthenticated: true,
    userInfo: action.data
  });
}

const loginFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//SIGN UP FOR PERSONAL 
const signupForPersonalPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: null,
    signupStatus: false,
    signupResponse: null
  });
}

const signupForPersonalSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    signupStatus: true,
    signupResponse: action.data
  });
}

const signupForPersonalFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//SIGN_UP_FOR_COMPANY
const signupForCompanyPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: null,
    signupStatus: false,
    signupResponse: null
  });
}

const signupForCompanySuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    signupStatus: true,
    signupResponse: action.data
  });
}

const signupForCompanyFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: true,
    message: action.err
  });
}

//LOGOUT
const logoutSuccess = (state, action) => {
  return updateObject(state, {
    err: false,
    message: null,
    isAuthenticated: false,
    userInfo: null
  })
}

//CLEAR_CACHE_LOGIN
const clearCacheLogin = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    err: false,
    message: null,
    signupStatus: false
  });
}

//UPDATE INFO
const updateInfoPending = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: true,
    err: false,
    message: null,
  });
}

const updateInfoSuccess = (state, action) => {
  // userInfo
  let userUpdated = updateObject(state.userInfo.user, {
    name: action.data.name,
    birthday: action.data.birthday,
    gender: action.data.gender
  });

  let userInfoUpdated = updateObject(state.userInfo, {
    user: userUpdated
  });

  return updateObject(state, {
    isLoadingUpdate: false,
    userInfo: userInfoUpdated
  });
}

const updateInfoFail = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: false,
    err: true,
    message: action.err
  });
}

//UPDATE PASSWORD
const updatePaswordPending = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: true,
    err: false,
    message: null
  });
}

const updatePaswordSuccess = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: false
  });
}

const updatePaswordFail = (state, action) => {
  return updateObject(state, {
    isLoadingUpdate: false,
    err: true,
    message: action.err
  });
}


//UPDATE AVATAR
const updateAvatarPending = (state, action) => {
  return updateObject(state, {
    isLoadingUploadAvatar: true,
    err: false,
    message: null
  });
}

const updateAvatarSuccess = (state, action) => {
  let userUpdated = updateObject(state.userInfo.user, {
    avatar_url: action.data.avatar_url
  });

  let userInfoUpdated = updateObject(state.userInfo, {
    user: userUpdated
  });

  return updateObject(state, {
    isLoadingUploadAvatar: false,
    userInfo: userInfoUpdated
  });
}

const updateAvatarFail = (state, action) => {
  return updateObject(state, {
    isLoadingUploadAvatar: false,
    err: true,
    message: action.err
  });
}

//UPDATE_INFO_COMPANY
const updateCompanyInfoPending = (state, action) => {
  return updateObject(state, {
    isLoadingUpdateCompanyInfo: true,
    err: false,
    message: ''
  })
}

const updateCompanyInfoSuccess = (state, action) => {
  // userInfo
  let userUpdated = updateObject(state.userInfo.user, {
    company: action.data
  });

  let userInfoUpdated = updateObject(state.userInfo, {
    user: userUpdated
  });

  return updateObject(state, {
    isLoadingUpdateCompanyInfo: false,
    userInfo: userInfoUpdated
  });
}

const updateCompanyInfoFail = (state, action) => {
  return updateObject(state, {
    isLoadingUpdateCompanyInfo: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN.PENDING: return loginPending(state, action);
    case actionTypes.LOGIN.SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN.FAIL: return loginFail(state, action);

    case actionTypes.SIGN_UP_FOR_PESONAL.PENDING: return signupForPersonalPending(state, action);
    case actionTypes.SIGN_UP_FOR_PESONAL.SUCCESS: return signupForPersonalSuccess(state, action);
    case actionTypes.SIGN_UP_FOR_PESONAL.FAIL: return signupForPersonalFail(state, action);

    case actionTypes.SIGN_UP_FOR_COMPANY.PENDING: return signupForCompanyPending(state, action);
    case actionTypes.SIGN_UP_FOR_COMPANY.SUCCESS: return signupForCompanySuccess(state, action);
    case actionTypes.SIGN_UP_FOR_COMPANY.FAIL: return signupForCompanyFail(state, action);

    case actionTypes.UPDATE_INFO.PENDING: return updateInfoPending(state, action);
    case actionTypes.UPDATE_INFO.SUCCESS: return updateInfoSuccess(state, action);
    case actionTypes.UPDATE_INFO.FAIL: return updateInfoFail(state, action);

    case actionTypes.UPDATE_PASSWORD.PENDING: return updatePaswordPending(state, action);
    case actionTypes.UPDATE_PASSWORD.SUCCESS: return updatePaswordSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD.FAIL: return updatePaswordFail(state, action);

    case actionTypes.UPDATE_AVATAR.PENDING: return updateAvatarPending(state, action);
    case actionTypes.UPDATE_AVATAR.SUCCESS: return updateAvatarSuccess(state, action);
    case actionTypes.UPDATE_AVATAR.FAIL: return updateAvatarFail(state, action);

    case actionTypes.LOGOUT.SUCCESS: return logoutSuccess(state, action);

    case actionTypes.CLEAR_CACHE_LOGIN: return clearCacheLogin(state, action);

    case actionTypes.UPDATE_INFO_COMPANY.PENDING: return updateCompanyInfoPending(state, action);
    case actionTypes.UPDATE_INFO_COMPANY.SUCCESS: return updateCompanyInfoSuccess(state, action);
    case actionTypes.UPDATE_INFO_COMPANY.FAIL: return updateCompanyInfoFail(state, action);

    default: return state;
  }
};

export default reducer;