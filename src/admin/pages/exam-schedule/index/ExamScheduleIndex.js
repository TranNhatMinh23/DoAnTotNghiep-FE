import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';
import ScreenExamSchedule from './ScreenExamSchedule';

class ExamScheduleIndex extends Component {
  componentDidMount() {
    this.props.getAllExamSchedule();
  }

  render() {
    const { isLoaded, listExamSchedule, err } = this.props;
    if (isLoaded && listExamSchedule) {
      return <ScreenExamSchedule listExamSchedule={listExamSchedule} />
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
  listExamSchedule: state.examScheduleReducer.listExamSchedule,
  isLoaded: !state.examScheduleReducer.isLoading,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllExamSchedule: () => dispatch(actions.getAllExamSchedule()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamScheduleIndex); 