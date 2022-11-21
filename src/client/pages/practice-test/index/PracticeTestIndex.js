import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';
import ScreenPracticeTest from './ScreenPracticeTest';
import queryString from 'query-string';

class PracticeTestIndex extends Component {
  componentDidMount() {
    const { page, by } = queryString.parse(this.props.location.search);  
    this.props.getAllExamPractice(page, by);
  }

  render() {
    const { isAuthenticated, isLoaded, listExams, err } = this.props;
    if (!isAuthenticated || (isLoaded && err)) {
      return <NotFoundPage />
    }

    if (isLoaded && listExams) {
      return <ScreenPracticeTest listExams={listExams} getAllExamPractice={this.props.getAllExamPractice} />
    }

    return (
      <Loading />
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  listExams: state.examClientReducer.listExams,
  isLoaded: !state.examClientReducer.isLoading,
  err: state.examClientReducer.err,
  message: state.examClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamPractice: (page, by) => dispatch(actions.getAllExamPractice(page, by))
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeTestIndex);