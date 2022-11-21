import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listAllCategories: [],
  detailCategory: null,
  isLoadingEdit: false,
  isLoadingCreate: false,
  isCreateSuccess: false
};

//GET ALL SLIDES
const getAllCategoriesPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listAllCategories: [] 
  })
}

const getAllCategoriesSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listAllCategories: action.data,
	});
}

const getAllCategoriesFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//ADD_NEW_CATEGORY
const addNewCategoriesPending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    isCreateSuccess: false,
    err: false,
    message: ''
  })
}

const addNewCategoriesSuccess = (state, action) => {
  let listAllCategoriesNew = state.listAllCategories.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: true,
    listAllCategories: listAllCategoriesNew
	});
}

const addNewCategoriesFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
}

const resetStatusCreatedNewCategory = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    isCreateSuccess: false,
  });
}

//DELETE_CATEGORY
const deleteCategoryPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteCategorySuccess = (state, action) => {
  let objIndex = state.listAllCategories.findIndex((obj => obj.id === action.categoryId));
  let tempObjCategory = state.listAllCategories;
  tempObjCategory.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listAllCategories: tempObjCategory
	});
}

const deleteCategoryFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_CATEGORY
const editCategoryPending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    isCreateSuccess: false,
    err: false,
    message: ''
  })
}

const editCategorySuccess = (state, action) => {
  let listAllCategoriesUpdated = state.listAllCategories.map(item => {
    if (item.id === action.data.id) return action.data;
    return item;
  });

	return updateObject(state, {
    isLoadingEdit: false,
    isCreateSuccess: true,
    listAllCategories: listAllCategoriesUpdated
	});
}

const editCategoryFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_CATEGORY.PENDING: return getAllCategoriesPending(state, action);
    case actionTypes.GET_ALL_CATEGORY.SUCCESS: return getAllCategoriesSuccess(state, action);
    case actionTypes.GET_ALL_CATEGORY.FAIL: return getAllCategoriesFail(state, action);
    
    case actionTypes.ADD_NEW_CATEGORY.PENDING: return addNewCategoriesPending(state, action);
    case actionTypes.ADD_NEW_CATEGORY.SUCCESS: return addNewCategoriesSuccess(state, action);
    case actionTypes.ADD_NEW_CATEGORY.FAIL: return addNewCategoriesFail(state, action);

    case actionTypes.RESET_STATUS_CREATED_CATEGORY: return resetStatusCreatedNewCategory(state, action);

    case actionTypes.DELETE_CATEGORY.PENDING: return deleteCategoryPending(state, action);
    case actionTypes.DELETE_CATEGORY.SUCCESS: return deleteCategorySuccess(state, action);
    case actionTypes.DELETE_CATEGORY.FAIL: return deleteCategoryFail(state, action);

    case actionTypes.EDIT_CATEGORY.PENDING: return editCategoryPending(state, action);
    case actionTypes.EDIT_CATEGORY.SUCCESS: return editCategorySuccess(state, action);
    case actionTypes.EDIT_CATEGORY.FAIL: return editCategoryFail(state, action);

		default: return state;
	}
};

export default reducer;