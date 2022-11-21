import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound'; 
import EditArticleForm from './EditArticleForm';

class EditArticle extends Component {
  componentDidMount() {
    const { articleId } = this.props.match.params;
    this.props.getArticleById(articleId);
    this.props.getAllCategory();
  }

  render() {

    const { isLoaded, detailArticle, listAllCategories, err } = this.props;

    if (isLoaded && detailArticle && listAllCategories) {
      return <EditArticleForm />
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
  listAllCategories: state.categoryReducer.listAllCategories,
  detailArticle: state.articlesReducer.detailArticle,
  isLoaded: !state.articlesReducer.isLoading,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllCategory: () => dispatch(actions.getAllCategory()),
  getArticleById: (articleId) => dispatch(actions.getArticleById(articleId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);