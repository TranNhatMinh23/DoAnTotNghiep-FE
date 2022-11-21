import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  isLoading: false,
  err: false,
  message: '',
  listAllArticles: [],
  detailArticle: null,
  isLoadingEdit: false,
  isLoadingCreate: false,
  isUpdatingStatus: false
};

//GET_ALL_ARTICLES
const getAllArticlesPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    listAllArticles: [] 
  })
}

const getAllArticlesSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    listAllArticles: action.data,
	});
}

const getAllArticlesFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CREATE_NEW_ARTICLE
const createNewArticlePending = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: true,
    err: false,
    message: ''
  })
}

const createNewArticleSuccess = (state, action) => {
  let listAllArticlesNew = state.listAllArticles.concat(action.data);
	return updateObject(state, {
    isLoadingCreate: false,
    listAllArticles: listAllArticlesNew
	});
}

const createNewArticleFail = (state, action) => {
  return updateObject(state, {
    isLoadingCreate: false,
    message: action.err,
    err: true,
  })
} 

//DELETE_ARTICLE
const deleteArticlePending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: ''
  })
}

const deleteArticleSuccess = (state, action) => {
  let objIndex = state.listAllArticles.findIndex((obj => obj.id === action.articleId));
  let tempObjArticle = state.listAllArticles;
  tempObjArticle.splice(objIndex, 1);
	return updateObject(state, {
    isLoading: false,
    listAllArticles: tempObjArticle
	});
}

const deleteArticleFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//CHANGE_ARTICLE_STATUS
const changeArticleStatusPending = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: true,
    err: false,
    message: ''
  })
}

const changeArticleStatusSuccess = (state, action) => {
  let objArticlesUpdated = state.listAllArticles.map(item => {
    if (item.id === action.data.id) return updateObject(item, {status: action.data.status});
    return item;
  });

	return updateObject(state, {
    isUpdatingStatus: false,
    listAllArticles: objArticlesUpdated,
	});
}

const changeArticleStatusFail = (state, action) => {
  return updateObject(state, {
    isUpdatingStatus: false,
    message: action.err,
    err: true,
  })
}

//GET_ARTICLE_BY_ID
const getArticleByIdPending = (state, action) => {
  return updateObject(state, {
    isLoading: true,
    err: false,
    message: '',
    detailArticle: null
  })
}

const getArticleByIdSuccess = (state, action) => {
	return updateObject(state, {
    isLoading: false,
    detailArticle: action.data,
	});
}

const getArticleByIdFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    message: action.err,
    err: true,
  })
}

//EDIT_ARTICLE
const editArticlePending = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: true,
    err: false,
    message: ''
  })
}

const editArticleSuccess = (state, action) => {
	return updateObject(state, {
    isLoadingEdit: false
	});
}

const editArticleFail = (state, action) => {
  return updateObject(state, {
    isLoadingEdit: false,
    message: action.err,
    err: true,
  })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_ARTICLES.PENDING: return getAllArticlesPending(state, action);
    case actionTypes.GET_ALL_ARTICLES.SUCCESS: return getAllArticlesSuccess(state, action);
    case actionTypes.GET_ALL_ARTICLES.FAIL: return getAllArticlesFail(state, action);
    
    case actionTypes.CREATE_NEW_ARTICLE.PENDING: return createNewArticlePending(state, action);
    case actionTypes.CREATE_NEW_ARTICLE.SUCCESS: return createNewArticleSuccess(state, action);
    case actionTypes.CREATE_NEW_ARTICLE.FAIL: return createNewArticleFail(state, action);

    case actionTypes.DELETE_ARTICLE.PENDING: return deleteArticlePending(state, action);
    case actionTypes.DELETE_ARTICLE.SUCCESS: return deleteArticleSuccess(state, action);
    case actionTypes.DELETE_ARTICLE.FAIL: return deleteArticleFail(state, action);

    case actionTypes.CHANGE_ARTICLE_STATUS.PENDING: return changeArticleStatusPending(state, action);
    case actionTypes.CHANGE_ARTICLE_STATUS.SUCCESS: return changeArticleStatusSuccess(state, action);
    case actionTypes.CHANGE_ARTICLE_STATUS.FAIL: return changeArticleStatusFail(state, action);

    case actionTypes.GET_ARTICLE_BY_ID.PENDING: return getArticleByIdPending(state, action);
    case actionTypes.GET_ARTICLE_BY_ID.SUCCESS: return getArticleByIdSuccess(state, action);
    case actionTypes.GET_ARTICLE_BY_ID.FAIL: return getArticleByIdFail(state, action);

    case actionTypes.EDIT_ARTICLE.PENDING: return editArticlePending(state, action);
    case actionTypes.EDIT_ARTICLE.SUCCESS: return editArticleSuccess(state, action);
    case actionTypes.EDIT_ARTICLE.FAIL: return editArticleFail(state, action);

		default: return state;
	}
};

export default reducer;