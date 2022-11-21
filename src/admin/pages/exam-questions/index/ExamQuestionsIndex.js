import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';
import ScreenExamQuestions from './ScreenExamQuestions';

class ExamQuestionsIndex extends Component {
  componentDidMount() {
    this.props.getAllExamQuestions();
  }

  render() {
    const { isLoaded, listExamQuestions, err } = this.props;
    if (isLoaded && listExamQuestions) {
      return <ScreenExamQuestions listExamQuestions={listExamQuestions} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  isLoaded: !state.examquestionReducer.isLoading,
  err: state.examquestionReducer.err,
  message: state.examquestionReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamQuestionsIndex);