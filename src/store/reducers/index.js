import { combineReducers } from 'redux';
import initReducer from './initReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import examquestionReducer from './examquestionReducer';
import detailPartReducer from './detailPartReducer';
import examquestionScoreReducer from './examquestionScoreReducer';
import examScheduleReducer from './examScheduleReducer';
import examClientReducer from './examClientReducer';
import userClientReducer from './userClientReducer';
import reportsReducer from './reportsReducer';
import sampleExamReducer from './sampleExamReducer';
import sampleExamClientReducer from './sampleExamClientReducer';
import submitAnswerResultReducer from './submitAnswerResultReducer';
import contactManagementReducer from './contactManagementReducer';
import slideReducer from './slideReducer';
import categoryReducer from './categoryReducer';
import articlesReducer from './articlesReducer';
import tipsReducer from './tipsReducer';
import homeReducer from './homeReducer';
import companyReducer from './companyReducer';
import homeClientReducer from './homeClientReducer';
import statisticalReducer from './statisticalReducer';

export default combineReducers({
  initReducer,
  authReducer,
  userReducer,
  examquestionReducer,
  detailPartReducer,
  examquestionScoreReducer,
  examScheduleReducer,
  examClientReducer,
  userClientReducer,
  reportsReducer,
  sampleExamReducer,
  sampleExamClientReducer,
  submitAnswerResultReducer,
  contactManagementReducer,
  slideReducer,
  categoryReducer,
  articlesReducer,
  tipsReducer,
  homeReducer,
  companyReducer,
  homeClientReducer,
  statisticalReducer
});