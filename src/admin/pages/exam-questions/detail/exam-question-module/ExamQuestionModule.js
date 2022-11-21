import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import NotFoundPage from '../../../../components/not-found/NotFound';
import Loading from '../../../../components/loading/Loading';
import ScreenExamQuestionModule from './ScreenExamQuestionModule';

class ExamQuestionModule extends Component {
  componentDidMount() {
    let { examQuestionId } = this.props.match.params;
    this.props.getExamQuestionById(examQuestionId);
    this.props.getAllExamQuestionScore();
  }

  render() {

    const { isLoaded, detailExamQuestion, listExamQuestionScore, err } = this.props;

    if (isLoaded && detailExamQuestion && listExamQuestionScore) {
      return <ScreenExamQuestionModule detailExamQuestion={detailExamQuestion} />
    }

    if (isLoaded && err) {
      return <NotFoundPage />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.examquestionReducer.isLoading,
  err: state.examquestionReducer.err,
  message: state.examquestionReducer.message,
  detailExamQuestion: state.examquestionReducer.detailExamQuestion,
  listExamQuestionScore: state.examquestionScoreReducer.listExamQuestionScore,
});

const mapDispatchToProps = dispatch => ({
  getExamQuestionById: (examQuestionId) => dispatch(actions.getExamQuestionById(examQuestionId)),
  getAllExamQuestionScore: () => dispatch(actions.getAllExamQuestionScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamQuestionModule);