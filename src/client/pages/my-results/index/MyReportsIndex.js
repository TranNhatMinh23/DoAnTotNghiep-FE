import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';
import ScreenMyReports from './ScreenMyReports';

class MyReportsIndex extends Component {
  componentDidMount() {
    this.props.myReports();
  }

  render() {
    const { isLoaded, listMyReports, err, listSampleExamReports } = this.props;
    if (!isLoaded) {
      return (
        <Loading />
      );
    }

    if (isLoaded && err) {
      return <NotFoundPage />
    }

    if (isLoaded && listMyReports) { 
      return <ScreenMyReports listMyReports={listMyReports} listSampleExamReports={listSampleExamReports} />
    }

    return (
      <Loading />
    );
  }
}


const mapStateToProps = state => ({
  listMyReports: state.userClientReducer.listMyReports,
  listSampleExamReports: state.userClientReducer.listSampleExamReports,
  isLoaded: !state.userClientReducer.isLoading,
  err: state.userClientReducer.err,
  message: state.userClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  myReports: () => dispatch(actions.myReports())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReportsIndex); 