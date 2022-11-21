import React, { Component } from 'react';
import PropTypes from 'prop-types';   
import { connect } from 'react-redux'; 
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound';  
import ScreenStatisticalDetail from './ScreenStatisticalDetail';

class StatisticalDetail extends Component {
  componentDidMount() {
    let { userId } = this.props.match.params; 
    this.props.getDetailStatisticalOfUser(userId);
  }

  render() {
    const { isLoaded, detailStatisticalOfUser, err } = this.props; 
    
    if (isLoaded && !err && detailStatisticalOfUser) {
      return <ScreenStatisticalDetail detailStatisticalOfUser={detailStatisticalOfUser} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

StatisticalDetail.propTypes = {
  detailStatisticalOfUser: PropTypes.object
}; 

const mapStateToProps = state => ({
  detailStatisticalOfUser: state.statisticalReducer.detailStatisticalOfUser,
  isLoaded: !state.statisticalReducer.isLoading,
  err: state.statisticalReducer.err,
  message: state.statisticalReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getDetailStatisticalOfUser: (userId) => dispatch(actions.getDetailStatisticalOfUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticalDetail);