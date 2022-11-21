import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import EditExamScheduleForm from './EditExamScheduleForm';

class EditExamSchedule extends Component {
  componentDidMount() {
    let { examScheduleId } = this.props.match.params;
    this.props.getExamScheduleById(examScheduleId);
    this.props.getAllExamQuestions();
    this.props.getAllExamQuestionsOfSystemForCompany();
  }

  render() {

    const { isLoaded, detailExamSchedule, listExamQuestions, listExamQuestionOfSystemForCompanyToUse, err } = this.props;

    if (isLoaded && detailExamSchedule && listExamQuestions) {
      return <EditExamScheduleForm detailExamSchedule={detailExamSchedule} listExamQuestionOfSystemForCompanyToUse={listExamQuestionOfSystemForCompanyToUse} />
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
  isLoaded: !state.examScheduleReducer.isLoading,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
  detailExamSchedule: state.examScheduleReducer.detailExamSchedule,
  listExamQuestions: state.examquestionReducer.listExamQuestions,
  listExamQuestionOfSystemForCompanyToUse: state.examquestionReducer.listExamQuestionOfSystemForCompanyToUse,
});

const mapDispatchToProps = dispatch => ({
  getExamScheduleById: (examScheduleId) => dispatch(actions.getExamScheduleById(examScheduleId)),
  getAllExamQuestions: () => dispatch(actions.getAllExamQuestions()),
  getAllExamQuestionsOfSystemForCompany: () => dispatch(actions.getAllExamQuestionsOfSystemForCompany())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExamSchedule);