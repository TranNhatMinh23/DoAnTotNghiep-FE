import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import EditSampleExamForm from './EditSampleExamForm';

class EditSampleExam extends Component {
  componentDidMount() {
    let { sampleExamId } = this.props.match.params;
    this.props.getSampleExamById(sampleExamId);
    this.props.getAllExamQuestions();
  }

  render() {

    const { isLoaded, detailSampleExam, listExamQuestions, err } = this.props;

    if (isLoaded && detailSampleExam && listExamQuestions) {
      return <EditSampleExamForm detailSampleExam={detailSampleExam} />
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
  isLoaded: !state.sampleExamReducer.isLoading,
  err: state.sampleExamReducer.err,
  message: state.sampleExamReducer.message,
  detailSampleExam: state.sampleExamReducer.detailSampleExam,
  listExamQuestions: state.examquestionReducer.listExamQuestions,
});

const mapDispatchToProps = dispatch => ({
  getSampleExamById: (sampleExamId) => dispatch(actions.getSampleExamById(sampleExamId)),
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSampleExam);