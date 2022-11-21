import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFound from '../../../../components/not-found/NotFound';
import ScreenScoreMapping from './ScreenScoreMapping';

class ScoreMappingIndex extends Component {
  componentDidMount() {
    const { examQuestionScoreId } = this.props.match.params;
    this.props.getExamQuestionScoreById(examQuestionScoreId);
  }

  render() {
    const { isLoaded, detailExamQuestionScore, err } = this.props;
    if (isLoaded && detailExamQuestionScore) {
      return <ScreenScoreMapping detailExamQuestionScore={detailExamQuestionScore} />
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
  detailExamQuestionScore: state.examquestionScoreReducer.detailExamQuestionScore,
  isLoaded: !state.examquestionScoreReducer.isLoading,
  err: state.examquestionScoreReducer.err,
  message: state.examquestionScoreReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getExamQuestionScoreById: (examQuestionScoreId) => dispatch(actions.getExamQuestionScoreById(examQuestionScoreId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScoreMappingIndex);