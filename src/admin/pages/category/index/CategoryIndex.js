import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFound from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading'; 
import ScreenCategory from './ScreenCategory';

class CategoryIndex extends Component {
  componentDidMount() {
    this.props.getAllCategory();
  }

  render() {
    const { isLoaded, listAllCategories, err } = this.props;
    if (isLoaded && listAllCategories) { 
      return <ScreenCategory />
    }

    if (isLoaded && err) {
      return <NotFound />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  listAllCategories: state.categoryReducer.listAllCategories,
  isLoaded: !state.categoryReducer.isLoading,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllCategory: () => dispatch(actions.getAllCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryIndex);