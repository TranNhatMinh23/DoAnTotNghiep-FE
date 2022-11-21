import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Switch, Route, withRouter } from 'react-router-dom';
import NotFoundPage from './components/not-found/NotFound';
import LayoutClient from './layout/LayoutClient';
import Homepage from './pages/homepage/Homepage';
import MyProfile from './pages/my-profile/index/MyProfile';
import LoginPage from '../layout/login/LoginPage';
import SignupPage from '../layout/signup/SignupPage';
import PracticeTestIndex from './pages/practice-test/index/PracticeTestIndex';
import PreviewExam from './pages/practice-test/detail/preview-exam/PreviewExam';
import ViewExam from './pages/practice-test/detail/view-exam/ViewExam';
import ScoreCerf from './pages/score-cerf/ScoreCerf';
import Contact from './pages/contact/Contact';
import MyReportsIndex from './pages/my-results/index/MyReportsIndex';
import SignupCompanyPage from '../layout/signup-company/SignupCompanyPage';
import SampleExamIndex from './pages/sample-exam/index/SampleExamIndex';
import PreviewSampleExam from './pages/sample-exam/detail/preview-sample-exam/PreviewSampleExam';
import ViewSampleExam from './pages/sample-exam/detail/view-sample-exam/ViewSampleExam';
import ViewResultExam from './components/view-result-exam/ViewResultExam';
import TipsIndex from './pages/tips/index/TipsIndex';
import DetailTip from './pages/tips/detail/DetailTip';
import ViewDetailIndex from './pages/homepage/view-detail/ViewDetailIndex';
import ViewAnswerIndex from './pages/my-results/detail/view-answer/ViewAnswerIndex';
import ViewMoreIndex from './pages/view-more/ViewMoreIndex';
import DetailArticle from './pages/view-more/detail-article/DetailArticle';

function DashboardClient({ isAuthenticated }) {
  return (
    <DocumentTitle title='English Center - Best choice for your future'>
      <Switch>
        <Route path='/login' render={props => <LoginPage {...props} />} />
        <Route path='/signup' render={props => <SignupPage {...props} />} exact />
        <Route path='/signup/company' render={props => <SignupCompanyPage {...props} />} />
        <LayoutClient>
          <Switch>
            <Route path="/" render={props => <Homepage {...props} />} exact />
            {isAuthenticated && <Route path="/my-profile" render={props => <MyProfile {...props} />} exact />}
            {isAuthenticated && <Route path="/practice-test" render={props => <PracticeTestIndex {...props} />} exact />}
            {isAuthenticated && <Route path="/preview-exam" render={props => <PreviewExam {...props} />} exact />}
            {isAuthenticated && <Route path="/view-exam" render={props => <ViewExam {...props} />} exact />}
            {isAuthenticated && <Route path="/view-results" render={props => <ViewResultExam {...props} />} exact />}
            {isAuthenticated && <Route path="/my-reports" render={props => <MyReportsIndex {...props} />} exact />}
            {isAuthenticated && <Route path="/view-answers" render={props => <ViewAnswerIndex {...props} />} exact />}
            {isAuthenticated && <Route path="/sample-exams" render={props => <SampleExamIndex {...props} />} exact />}
            {isAuthenticated && <Route path="/preview-sample-exam" render={props => <PreviewSampleExam {...props} />} exact />}
            {isAuthenticated && <Route path="/view-sample-exam" render={props => <ViewSampleExam {...props} />} exact />}
            <Route path="/score-and-cerf" render={props => <ScoreCerf {...props} />} exact />
            <Route path="/contact" render={props => <Contact {...props} />} exact />
            <Route path="/tips" render={props => <TipsIndex {...props} />} exact />
            <Route path="/tips/detail" render={props => <DetailTip {...props} />} exact />
            <Route path="/view-all" render={props => <ViewMoreIndex {...props} />} exact />
            <Route path="/view-detail-article" render={props => <DetailArticle {...props} />} exact />
            <Route path="/notifications/detail/:id" render={props => <ViewDetailIndex {...props} />} exact />
            <Route component={NotFoundPage} />
          </Switch>
        </LayoutClient>
      </Switch>
    </DocumentTitle>
  );
}


DashboardClient.propTypes = {
  isAuthenticated: PropTypes.bool
}

DashboardClient.defaultProps = {
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(connect(mapStateToProps, null)(DashboardClient));