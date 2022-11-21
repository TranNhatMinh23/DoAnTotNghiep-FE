import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';
import queryString from 'query-string';
import ScreenDetailTip from './ScreenDetailTip';

class DetailTip extends Component {
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    this.props.getDetailTip(id);
  }

  componentDidUpdate(prevProps) {
    const prevId = queryString.parse(prevProps.location.search).id;
    const currentId = queryString.parse(this.props.location.search).id;
    if (prevId !== currentId) {
      this.props.getDetailTip(currentId);
    }
  }

  render() {
    const { isLoaded, detailTip, releatedTips, err } = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }

    if (isLoaded && detailTip) {
      return <ScreenDetailTip detailTip={detailTip} releatedTips={releatedTips} />
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
  getDetailTip: (tipId) => dispatch(actions.getDetailTip(tipId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailTip);