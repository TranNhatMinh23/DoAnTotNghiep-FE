import React, { Component } from 'react';
import PropTypes from 'prop-types';   
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound'; 
import ScreenStatistical from './ScreenStatistical';

class StatisticalIndex extends Component {
  componentDidMount() {
    this.props.getStatisticals();
  }

  render() {
    const { isLoaded, listUserStatistical, err } = this.props; 
    if (isLoaded && !err) {  
      return <ScreenStatistical listUserStatistical={listUserStatistical} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

StatisticalIndex.propTypes = {
  listUserStatistical: PropTypes.array
};

StatisticalIndex.defaultProps = {
  listUserStatistical: []
}

const mapStateToProps = state => ({
  listUserStatistical: state.statisticalReducer.listUserStatistical,
  isLoaded: !state.statisticalReducer.isLoading,
  err: state.statisticalReducer.err,
  message: state.statisticalReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getStatisticals: () => dispatch(actions.getStatisticals())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticalIndex);