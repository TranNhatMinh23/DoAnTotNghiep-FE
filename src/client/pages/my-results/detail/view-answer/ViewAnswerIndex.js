import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import NotFoundPage from '../../../../components/not-found/NotFound';
import Loading from '../../../../components/loading/Loading';
import styles from './ViewAnswerIndex.module.css';
import ScreenViewDetailResult from './ScreenViewDetailResult';

class ViewAnswerIndex extends Component {
  componentDidMount() {
    const { reportId } = queryString.parse(this.props.location.search);
    this.props.getResultByReportId(reportId);
  }

  render() {
    const { isLoaded, resultAnswer, message, err, authInfo } = this.props;  
    if (isLoaded && resultAnswer !== null) {
      return <ScreenViewDetailResult resultAnswer={resultAnswer} authInfo={authInfo} />
    }

    if (isLoaded && resultAnswer === null) {
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
  isLoaded: !state.reportsReducer.isLoading,
  err: state.reportsReducer.err,
  message: state.reportsReducer.message,
  resultAnswer: state.reportsReducer.resultAnswer,
  authInfo: state.authReducer.userInfo.user
});

const mapDispatchToProps = dispatch => ({ 
  getResultByReportId: (reportId) => dispatch(actions.getResultByReportId(reportId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAnswerIndex);