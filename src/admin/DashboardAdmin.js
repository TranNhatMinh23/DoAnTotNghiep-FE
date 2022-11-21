import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import LayoutAdmin from './layout/LayoutAdmin';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NotFoundPage from './components/not-found/NotFound';
import Homepage from './pages/homepage/Homepage';
import Profile from './pages/profile/index/Profile';
import UsersManagementIndex from './pages/users-management/index/UsersManagementIndex';
import AddNewUserForm from './pages/users-management/detail/add-new-user-form/AddNewUserForm';
import EditUser from './pages/users-management/detail/edit-user/EditUser';
import ExamQuestionsIndex from './pages/exam-questions/index/ExamQuestionsIndex';
import ExamQuestionModule from './pages/exam-questions/detail/exam-question-module/ExamQuestionModule';
import DetailPartOne from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-one/DetailPartOne';
import DetailPartTwo from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-two/DetailPartTwo';
import DetailPartThree from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-three/DetailPartThree';
import DetailPartFour from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-four/DetailPartFour';
import DetailPartFive from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-five/DetailPartFive';
import DetailPartSix from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-six/DetailPartSix';
import DetailPartSeven from './pages/exam-questions/detail/exam-question-module/table-detail-parts/detail-part-seven/DetailPartSeven';
import ExamQuestionScoreIndex from './pages/exam-question-score/index/ExamQuestionScoreIndex';
import ScoreMappingIndex from './pages/exam-question-score/detail/score-mapping/ScoreMappingIndex';
import ExamScheduleIndex from './pages/exam-schedule/index/ExamScheduleIndex';
import AddExamSchedule from './pages/exam-schedule/detail/add-exam-schedule/AddExamSchedule';
import EditExamSchedule from './pages/exam-schedule/detail/edit-exam-schedule/EditExamSchedule';
import ReportsIndex from './pages/reports/index/ReportsIndex';
import ReportsDetail from './pages/reports/detail/ReportsDetail';
import SampleExamIndex from './pages/sample-exam/index/SampleExamIndex';
import AddSampleExam from './pages/sample-exam/detail/add-sample-exam/AddSampleExam';
import EditSampleExam from './pages/sample-exam/detail/edit-sample-exam/EditSampleExam';
import Contact from './pages/contact/Contact';
import SlideIndex from './pages/slide/index/SlideIndex';
import AddSlide from './pages/slide/detail/add-slide/AddSlide';
import EditSlide from './pages/slide/detail/edit-slide/EditSlide';
import CategoryIndex from './pages/category/index/CategoryIndex';
import ArticlesIndex from './pages/articles/index/ArticlesIndex';
import AddNewArticle from './pages/articles/detail/add-new-article/AddNewArticle';
import EditArticle from './pages/articles/detail/edit-article/EditArticle';
import HomepageManager from './pages/homepage-manager/HomepageManager';
import CompanyIndex from './pages/company/CompanyIndex'; 
import StatisticalIndex from './pages/statistical/index/StatisticalIndex';
import StatisticalDetail from './pages/statistical/detail/StatisticalDetail';

function DashboardAdmin({ isAuthenticated, isLoading, userInfo }) {
  if (!isAuthenticated && !isLoading) {
    return (
      window.location.pathname = '/'
    )
  }

  const routeForManager = (
    <Switch>
      <Route component={props => <HomepageManager {...props} />} path="/" exact />
      <Route component={props => <HomepageManager {...props} />} path="/home" exact />
      <Route component={props => <Profile {...props} />} path="/profile" exact />
      <Route component={props => <ExamQuestionsIndex {...props} />} path="/exam-questions" exact />
      <Route component={props => <ExamQuestionModule {...props} />} path="/exam-questions/:examQuestionId" exact />
      <Route component={props => <DetailPartOne {...props} />} path="/exam-questions/:examQuestionId/part1-:partId" exact />
      <Route component={props => <DetailPartTwo {...props} />} path="/exam-questions/:examQuestionId/part2-:partId" exact />
      <Route component={props => <DetailPartThree {...props} />} path="/exam-questions/:examQuestionId/part3-:partId" exact />
      <Route component={props => <DetailPartFour {...props} />} path="/exam-questions/:examQuestionId/part4-:partId" exact />
      <Route component={props => <DetailPartFive {...props} />} path="/exam-questions/:examQuestionId/part5-:partId" exact />
      <Route component={props => <DetailPartSix {...props} />} path="/exam-questions/:examQuestionId/part6-:partId" exact />
      <Route component={props => <DetailPartSeven {...props} />} path="/exam-questions/:examQuestionId/part7-:partId" exact />
      <Route component={props => <ExamQuestionScoreIndex {...props} />} path="/exam-question-scores" exact />
      <Route component={props => <ScoreMappingIndex {...props} />} path="/exam-question-scores/:examQuestionScoreId" exact />
      <Route component={props => <ExamScheduleIndex {...props} />} path="/exam-schedules" exact />
      <Route component={props => <AddExamSchedule {...props} />} path="/exam-schedules/add" exact />
      <Route component={props => <EditExamSchedule {...props} />} path="/exam-schedules/edit/:examScheduleId" exact />
      <Route component={props => <ReportsIndex {...props} />} path="/reports" exact />
      <Route component={props => <ReportsDetail {...props} />} path="/detail-reports" exact />
      <Route component={props => <StatisticalIndex {...props} />} path="/statistical" exact />
      <Route component={props => <StatisticalDetail {...props} />} path="/statistical/:userId" exact />
      <Route component={NotFoundPage} />  
    </Switch>
  );

  const routeForAdmin = (
    <Switch>
      <Route component={props => <Homepage {...props} />} path="/" exact />
      <Route component={props => <Homepage {...props} />} path="/home" exact />
      <Route component={props => <CompanyIndex {...props} />} path="/companies" exact />
      <Route render={props => <UsersManagementIndex {...props} />} path="/users-management" exact />
      <Route render={props => <AddNewUserForm {...props} />} path="/users-management/add-new-user" exact />
      <Route render={props => <EditUser {...props} />} path="/users-management/edit-user/:userId" exact />
      <Route component={props => <Profile {...props} />} path="/profile" exact />
      <Route component={props => <ExamQuestionsIndex {...props} />} path="/exam-questions" exact />
      <Route component={props => <ExamQuestionModule {...props} />} path="/exam-questions/:examQuestionId" exact />
      <Route component={props => <DetailPartOne {...props} />} path="/exam-questions/:examQuestionId/part1-:partId" exact />
      <Route component={props => <DetailPartTwo {...props} />} path="/exam-questions/:examQuestionId/part2-:partId" exact />
      <Route component={props => <DetailPartThree {...props} />} path="/exam-questions/:examQuestionId/part3-:partId" exact />
      <Route component={props => <DetailPartFour {...props} />} path="/exam-questions/:examQuestionId/part4-:partId" exact />
      <Route component={props => <DetailPartFive {...props} />} path="/exam-questions/:examQuestionId/part5-:partId" exact />
      <Route component={props => <DetailPartSix {...props} />} path="/exam-questions/:examQuestionId/part6-:partId" exact />
      <Route component={props => <DetailPartSeven {...props} />} path="/exam-questions/:examQuestionId/part7-:partId" exact />
      <Route component={props => <ExamQuestionScoreIndex {...props} />} path="/exam-question-scores" exact />
      <Route component={props => <ScoreMappingIndex {...props} />} path="/exam-question-scores/:examQuestionScoreId" exact />
      <Route component={props => <SampleExamIndex {...props} />} path="/sample-exams" exact />
      <Route component={props => <AddSampleExam {...props} />} path="/sample-exams/add" exact />
      <Route component={props => <EditSampleExam {...props} />} path="/sample-exams/edit/:sampleExamId" exact />
      <Route component={props => <ReportsIndex {...props} />} path="/reports" exact />
      <Route component={props => <ReportsDetail {...props} />} path="/detail-reports" exact />
      <Route component={props => <Contact {...props} />} path="/contacts" exact />
      <Route component={props => <SlideIndex {...props} />} path="/slides" exact /> 
      <Route component={props => <AddSlide {...props} />} path="/slides/add-new" exact />
      <Route component={props => <EditSlide {...props} />} path="/slides/edit/:slideId" exact />
      <Route component={props => <CategoryIndex {...props} />} path="/category" exact />
      <Route component={props => <ArticlesIndex {...props} />} path="/articles" exact />
      <Route component={props => <AddNewArticle {...props} />} path="/articles/add-new" exact />
      <Route component={props => <EditArticle {...props} />} path="/articles/edit/:articleId" exact />
      <Route component={props => <StatisticalIndex {...props} />} path="/statistical" exact />
      <Route component={props => <StatisticalDetail {...props} />} path="/statistical/:userId" exact />
      <Route component={NotFoundPage} /> 
    </Switch>
  );

  return (
    <DocumentTitle title='Admin Management'>
      <BrowserRouter basename="/admin">
        <LayoutAdmin>
          {userInfo.user.role.name === "Admin" && routeForAdmin}
          {userInfo.user.role.name === "Manager" && routeForManager}
        </LayoutAdmin>
      </BrowserRouter>
    </DocumentTitle>
  );
}

DashboardAdmin.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo,
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, null)(DashboardAdmin);