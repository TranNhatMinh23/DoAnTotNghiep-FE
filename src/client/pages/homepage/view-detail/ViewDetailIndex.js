import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading'; 

class ViewDetailIndex extends Component {
  componentDidMount() {
    // const { id } = this.props.match.params; 
  }

  render() {
    const { isLoaded, err } = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }

    if (isLoaded) {
      return <p>Detail</p>
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  detailTip: state.tipsReducer.detailTip,
  releatedTips: state.tipsReducer.releatedTips,
  isLoaded: !state.tipsReducer.isLoading,
  err: state.tipsReducer.err,
  message: state.tipsReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetailIndex);