import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import queryString from 'query-string';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import styles from './ViewExam.module.css';  
import ScreenViewExam from './ScreenViewExam';

class ViewExam extends Component {

  componentDidMount() {
    const { examId } = queryString.parse(this.props.location.search); 
    this.props.getExamByIdClient(examId);
  }

  render() {
    const { isLoaded, detailExam, message, err } = this.props;  
    if (isLoaded && detailExam !== null) {
      return <ScreenViewExam detailExam={detailExam} /> 
    }

    if (isLoaded && detailExam === null) {
      return (
        <div className={styles.errorMessage}>
          {message}
        </div>
      )
    }

    if(isLoaded && err) {
      return <NotFoundPage />
    }

    return <Loading />
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.examClientReducer.isLoading,
  err: state.examClientReducer.err,
  message: state.examClientReducer.message,
  detailExam: state.examClientReducer.detailExam,
});

const mapDispatchToProps = dispatch => ({ 
  getExamByIdClient: (examId) => dispatch(actions.getExamByIdClient(examId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewExam);
