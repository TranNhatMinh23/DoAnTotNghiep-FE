import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listAllUsers: [],
  detailUser: null,
  isLoadingEdit: false,
  isUpdatingStatus: false 
};

//GET ALL USERS
const getAllUsersPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listAllUsers: [],
    isUpdating: false
  })
}

const getAllUsersSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listAllUsers: action.data,
	});
}

const getAllUsersFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE NEW USER 
const createNewUserPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const createNewUserSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
	});
}

const createNewUserFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//GET USER BY ID 
const getUserByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailUser: null
  })
}

const getUserByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailUser: action.data
	});
}

const getUserByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_USER_INFO
const editUserInfoPending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    err: false,
    message: ''
  })
}

const editUserInfoSuccess = (state, action) => {
	return updateObject(state, {
    isLoadingEdit: false
	});
}

const editUserInfoFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

//DELETE USER
const deleteUserPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteUserSuccess = (state, action) => {
  let objIndex = state.listAllUsers.findIndex((obj => obj.id === action.userId));
  let tempListAllUsers = state.listAllUsers;
  tempListAllUsers.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listAllUsers: tempListAllUsers,
	});
}

const deleteUserFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//TOGGLE_ACTIVE_USER_STATUS
const toggleUserStatusPending = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: true,
    err: false,
    message: ''
  })
}

const toggleUserStatusSuccess = (state, action) => {
  let userUpdated = state.listAllUsers.map(item => { 
    if (item.id === action.data.id) return updateObject(item, {active_status: action.data.active_status}); 
    return item;
  });

	return updateObject(state, {
    isUpdatingStatus: false,
    listAllUsers: userUpdated,
	});
}

const toggleUserStatusFail = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
    case actionTypes.GET_ALL_USERS.PENDING: return getAllUsersPending(state, action);
    case actionTypes.GET_ALL_USERS.SUCCESS: return getAllUsersSuccess(state, action);
    case actionTypes.GET_ALL_USERS.FAIL: return getAllUsersFail(state, action);

    case actionTypes.CREATE_NEW_USER.PENDING: return createNewUserPending(state, action);
    case actionTypes.CREATE_NEW_USER.SUCCESS: return createNewUserSuccess(state, action);
    case actionTypes.CREATE_NEW_USER.FAIL: return createNewUserFail(state, action);

    case actionTypes.GET_USER_BY_ID.PENDING: return getUserByIdPending(state, action);
    case actionTypes.GET_USER_BY_ID.SUCCESS: return getUserByIdSuccess(state, action);
    case actionTypes.GET_USER_BY_ID.FAIL: return getUserByIdFail(state, action);

    case actionTypes.EDIT_USER_INFO.PENDING: return editUserInfoPending(state, action);
    case actionTypes.EDIT_USER_INFO.SUCCESS: return editUserInfoSuccess(state, action);
    case actionTypes.EDIT_USER_INFO.FAIL: return editUserInfoFail(state, action);

    case actionTypes.DELETE_USER.PENDING: return deleteUserPending(state, action);
    case actionTypes.DELETE_USER.SUCCESS: return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER.FAIL: return deleteUserFail(state, action);

    case actionTypes.TOGGLE_ACTIVE_USER_STATUS.PENDING: return toggleUserStatusPending(state, action);
    case actionTypes.TOGGLE_ACTIVE_USER_STATUS.SUCCESS: return toggleUserStatusSuccess(state, action);
    case actionTypes.TOGGLE_ACTIVE_USER_STATUS.FAIL: return toggleUserStatusFail(state, action);
    
		default: return state;
	}
};

export default reducer;