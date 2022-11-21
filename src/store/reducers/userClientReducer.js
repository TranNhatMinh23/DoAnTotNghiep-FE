import * as actionTypes from '../../constants/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
	isLoading: false,
	sendSuccess: false,
	err: false,
	errMessage: '',
	listMyReports: null,
	listSampleExamReports: null
};

//SEND_CONTACT
const sendContactPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		sendSuccess: false
	});
}

const sendContactSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		sendSuccess: true
	});
}

const sendContactFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
	});
}

//MY_REPORTS
const myReportsPendding = (state, action) => {
	return updateObject(state, {
		isLoading: true,
		err: false,
		errMessage: '',
		listMyReports: null,
		listSampleExamReports: null
	});
}

const myReportsSuccess = (state, action) => {
	return updateObject(state, {
		isLoading: false, 
		listMyReports: action.data.exams,
		listSampleExamReports: action.data.sample_exams
	});
}

const myReportsFail = (state, action) => {
	return updateObject(state, {
		isLoading: false,
		err: true,
		errMessage: action.err
	});
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SEND_CONTACT.PENDING: return sendContactPendding(state, action);
		case actionTypes.SEND_CONTACT.SUCCESS: return sendContactSuccess(state, action);
		case actionTypes.SEND_CONTACT.FAIL: return sendContactFail(state, action);

		case actionTypes.MY_REPORTS.PENDING: return myReportsPendding(state, action);
		case actionTypes.MY_REPORTS.SUCCESS: return myReportsSuccess(state, action);
		case actionTypes.MY_REPORTS.FAIL: return myReportsFail(state, action);

		default: return state;
	}
};

export default reducer;