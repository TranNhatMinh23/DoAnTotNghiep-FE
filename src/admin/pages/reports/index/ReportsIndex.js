import React, { Component } from 'react';
import PropTypes from 'prop-types';   
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loading from '../../../components/loading/Loading';
import NotFound from '../../../components/not-found/NotFound'; 
import ScreenReports from './ScreenReports';

class ReportsIndex extends Component {
  componentDidMount() {
    this.props.getAllReports();
  }

  render() {
    const { isLoaded, listReports, err } = this.props;
    if (isLoaded && listReports) {
      return <ScreenReports listReports={listReports} />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

ReportsIndex.propTypes = {
  listReports: PropTypes.array
};

const mapStateToProps = state => ({
  listReports: state.reportsReducer.listReports,
  isLoaded: !state.reportsReducer.isLoading,
  err: state.reportsReducer.err,
  message: state.reportsReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllReports: () => dispatch(actions.getAllReports())
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsIndex);