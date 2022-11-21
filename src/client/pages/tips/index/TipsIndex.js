import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';  
import queryString from 'query-string';
import ScreenTips from './ScreenTips';

class TipsIndex extends Component {
  componentDidMount(){
    const { page } = queryString.parse(this.props.location.search); 
    this.props.getAllTips(page);
  }

  render(){
    const { isLoaded, listTips, err} = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }
 
    if (isLoaded && listTips) {
      return <ScreenTips listTips={listTips} getAllTips={this.props.getAllTips} />
    } 

    return (
      <Loading />
    );
  }
}


const mapStateToProps = state => ({
  listTips: state.tipsReducer.listTips,
  isLoaded: !state.tipsReducer.isLoading,
  err: state.tipsReducer.err,
  message: state.tipsReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllTips: (page) => dispatch(actions.getAllTips(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TipsIndex);