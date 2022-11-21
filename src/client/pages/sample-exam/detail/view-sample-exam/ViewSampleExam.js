import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import * as actions from '../../../../../store/actions/index';
import queryString from 'query-string';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import styles from './ViewSampleExam.module.css';   
import ScreenViewSampleExam from './ScreenViewSampleExam';

class ViewSampleExam extends Component {

  componentDidMount() {
    const { sampleExamId } = queryString.parse(this.props.location.search); 
    this.props.getSampleExamClientById(sampleExamId);
  }

  render() {
    const { isLoaded, detailSample, message, err } = this.props;  
    if (isLoaded && detailSample !== null) {
      return <ScreenViewSampleExam detailSample={detailSample} />  
    }

    if (isLoaded && detailSample === null) {
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
  isLoaded: !state.sampleExamClientReducer.isLoading,
  err: state.sampleExamClientReducer.err,
  message: state.sampleExamClientReducer.message,
  detailSample: state.sampleExamClientReducer.detailSample,
});

const mapDispatchToProps = dispatch => ({ 
  getSampleExamClientById: (sampleExamId) => dispatch(actions.getSampleExamClientById(sampleExamId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewSampleExam);
