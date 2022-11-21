import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';
import ScreenSampleExam from './ScreenSampleExam';

class SampleExamIndex extends Component {
  componentDidMount() {
    this.props.getAllSampleExams();
  }

  render() {
    const { isLoaded, listSampleExams, err } = this.props;
    if (isLoaded && listSampleExams) {
      return <ScreenSampleExam listSampleExams={listSampleExams} />
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
  listSampleExams: state.sampleExamReducer.listSampleExams,
  isLoaded: !state.sampleExamReducer.isLoading,
  err: state.sampleExamReducer.err,
  message: state.sampleExamReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllSampleExams: () => dispatch(actions.getAllSampleExams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleExamIndex); 