import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'; 
import Loading from '../../components/loading/Loading';
import HomepageManagerScreen from './HomepageManagerScreen';
import NotFoundPage from '../../components/not-found/NotFound';

class HomepageManager extends Component {
  componentDidMount(){
    this.props.getAllMainInfo();
  }

  render() {
    const { isLoaded, mainInfo, err } = this.props;
    if (isLoaded && mainInfo) {
      return <HomepageManagerScreen mainInfo={mainInfo} /> 
    }

    if (isLoaded && err) {
      return <NotFoundPage />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({ 
  mainInfo: state.homeReducer.mainInfo,
  isLoaded: !state.homeReducer.isLoading,
  err: state.homeReducer.err,
  message: state.homeReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
  getAllMainInfo: () => dispatch(actions.getAllMainInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomepageManager);