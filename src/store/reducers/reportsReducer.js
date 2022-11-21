import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	isLoading: false,
	err: false,
	message: '',
	listReports: [],
	detailReport: null,
	resultAnswer: null
};

//GET_ALL_REPORT
const getAllReportsPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		listReports: []
	});
}

const getAllReportsSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		listReports: action.data
	});
}

const getAllReportsFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

//GET_DETAIL_REPORT_BY_EXAM_ID
const getDetailReportByExamIdPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		detailReport: null
	});
}

const getDetailReportByExamIdSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		detailReport: action.data
	});
}

const getDetailReportByExamIdFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}

//GET_RESULT_BY_REPORT_ID
const getResultByReportIdPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		message: '',
		resultAnswer: null
	});
}

const getResultByReportIdSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		resultAnswer: action.data
	});
}

const getResultByReportIdFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		message: action.err
	});
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL_REPORT.PENDING: return getAllReportsPendding(state, action);
		case actionTypes.GET_ALL_REPORT.SUCCESS: return getAllReportsSuccess(state, action);
		case actionTypes.GET_ALL_REPORT.FAIL: return getAllReportsFail(state, action);

		case actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.PENDING: return getDetailReportByExamIdPendding(state, action);
		case actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.SUCCESS: return getDetailReportByExamIdSuccess(state, action);
		case actionTypes.GET_DETAIL_REPORT_BY_EXAM_ID.FAIL: return getDetailReportByExamIdFail(state, action);

		case actionTypes.GET_RESULT_BY_REPORT_ID.PENDING: return getResultByReportIdPendding(state, action);
		case actionTypes.GET_RESULT_BY_REPORT_ID.SUCCESS: return getResultByReportIdSuccess(state, action);
		case actionTypes.GET_RESULT_BY_REPORT_ID.FAIL: return getResultByReportIdFail(state, action);

		default: return state;
	}
};

export default reducer;