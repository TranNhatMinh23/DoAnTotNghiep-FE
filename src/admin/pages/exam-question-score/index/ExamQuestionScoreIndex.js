import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';
import ScreenExamQuestionScore from './ScreenExamQuestionScore';
// import { genarateDataScore } from '../../../../constants/mockup/genarateDataScore';

class ExamQuestionScoreIndex extends Component {
  componentDidMount() {
    this.props.getAllExamQuestionScore();
    // console.log(genarateDataScore(203));
  }

  render() {
    const { isLoaded, listExamQuestionScore, err } = this.props;
    if (isLoaded && listExamQuestionScore) {
      return <ScreenExamQuestionScore listExamQuestionScore={listExamQuestionScore} />
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
  listExamQuestionScore: state.examquestionScoreReducer.listExamQuestionScore,
  isLoaded: !state.examquestionScoreReducer.isLoading,
  err: state.examquestionScoreReducer.err,
  message: state.examquestionScoreReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamQuestionScore: () => dispatch(actions.getAllExamQuestionScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamQuestionScoreIndex);