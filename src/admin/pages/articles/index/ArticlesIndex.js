import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFound from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading'; 
import ScreenArticles from './ScreenArticles';

class ArticlesIndex extends Component {
  componentDidMount() {
    this.props.getAllArticles();
  }

  render() {
    const { isLoaded, listAllArticles, err } = this.props;
    if (isLoaded && listAllArticles) { 
      return <ScreenArticles />
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
  listAllArticles: state.articlesReducer.listAllArticles,
  isLoaded: !state.articlesReducer.isLoading,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllArticles: () => dispatch(actions.getAllArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesIndex);