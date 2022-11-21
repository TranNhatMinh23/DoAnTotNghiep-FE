import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	isLoading: false,
	err: false,
	message: '',
	mainInfo: null,
	dataViewAll: null,
	detailArticle: null
};

//GET_INFO_HOME_CLIENT
const getInfoHomeClientPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		mainInfo: null
	});
}

const getInfoHomeClientSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		mainInfo: action.data
	});
}

const getInfoHomeClientFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

//GET_ALL_ARTICLE_CLIENT
const getAllArticlesClientPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		dataViewAll: null
	});
}

const getAllArticlesClientSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		dataViewAll: action.data
	});
}

const getAllArticlesClientFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

//VIEW_DETAIL_ARTICLE_CLIENT
const viewDetailArticleClientPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		detailArticle: null
	});
}

const viewDetailArticleClientSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		detailArticle: action.data
	});
}

const viewDetailArticleClientFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_INFO_HOME_CLIENT.PENDING: return getInfoHomeClientPendding(state, action);
		case actionTypes.GET_INFO_HOME_CLIENT.SUCCESS: return getInfoHomeClientSuccess(state, action);
		case actionTypes.GET_INFO_HOME_CLIENT.FAIL: return getInfoHomeClientFail(state, action); 

		case actionTypes.GET_ALL_ARTICLE_CLIENT.PENDING: return getAllArticlesClientPendding(state, action);
		case actionTypes.GET_ALL_ARTICLE_CLIENT.SUCCESS: return getAllArticlesClientSuccess(state, action);
		case actionTypes.GET_ALL_ARTICLE_CLIENT.FAIL: return getAllArticlesClientFail(state, action);

		case actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.PENDING: return viewDetailArticleClientPendding(state, action);
		case actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.SUCCESS: return viewDetailArticleClientSuccess(state, action);
		case actionTypes.VIEW_DETAIL_ARTICLE_CLIENT.FAIL: return viewDetailArticleClientFail(state, action);

		default: return state;
	}
};

export default reducer;