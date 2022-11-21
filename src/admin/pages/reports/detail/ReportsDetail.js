import React, { Component } from 'react';
import PropTypes from 'prop-types';   
import { connect } from 'react-redux';
import queryString from 'query-string';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';  
import ScreenReportsDetail from './ScreenReportsDetail';

class ReportsDetail extends Component {
  componentDidMount() {
    let { examId } = queryString.parse(this.props.location.search); 
    this.props.getDetailReportByExamId(examId);
  }

  render() {
    const { isLoaded, detailReport, err, token } = this.props;
    if (isLoaded && detailReport) {
      return <ScreenReportsDetail detailReport={detailReport} token={token} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

ReportsDetail.propTypes = {
  detailReport: PropTypes.object
};

const mapStateToProps = state => ({
  detailReport: state.reportsReducer.detailReport,
  isLoaded: !state.reportsReducer.isLoading,
  err: state.reportsReducer.err,
  message: state.reportsReducer.message,
  token: state.authReducer.userInfo.token
});

const mapDispatchToProps = dispatch => ({
  getDetailReportByExamId: (examId) => dispatch(actions.getDetailReportByExamId(examId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsDetail);