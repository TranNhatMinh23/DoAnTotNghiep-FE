import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading'; 
import ScreenSampleExam from './ScreenSampleExam';
import queryString from 'query-string';

class SampleExamIndex extends Component {
  componentDidMount(){
    const { page } = queryString.parse(this.props.location.search); 
    this.props.getSampleExamsClient(page);
  }

  render(){
    const { isAuthenticated, isLoaded, listSamples, err} = this.props;
    if (!isAuthenticated || (isLoaded && err)) {
      return <NotFoundPage />
    }
 
    if (isLoaded && listSamples) {
      return <ScreenSampleExam listSamples={listSamples} getSampleExamsClient={this.props.getSampleExamsClient} />
    } 

    return (
      <Loading />
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  listSamples: state.sampleExamClientReducer.listSamples,
  isLoaded: !state.sampleExamClientReducer.isLoading,
  err: state.sampleExamClientReducer.err,
  message: state.sampleExamClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getSampleExamsClient: (page) => dispatch(actions.getSampleExamsClient(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleExamIndex);