import React, { Component } from 'react';
import ScreenHomepage from './ScreenHomepage';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';  
import NotFoundPage from '../../components/not-found/NotFound';
import Loading from '../../components/loading/Loading';

class Homepage extends Component {
  componentDidMount(){ 
    this.props.getInfoHomeClient();
  } 

  render(){
    const { isLoaded, mainInfo, err} = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }
 
    if (isLoaded && mainInfo) {
      return <ScreenHomepage mainInfo={mainInfo} />
    } 

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  mainInfo: state.homeClientReducer.mainInfo,
  isLoaded: !state.homeClientReducer.isLoading,
  err: state.homeClientReducer.err,
  message: state.homeClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getInfoHomeClient: () => dispatch(actions.getInfoHomeClient())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);