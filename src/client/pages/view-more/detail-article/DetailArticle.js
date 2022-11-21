import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFoundPage from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';
import queryString from 'query-string';
import DetailArticleScreen from './DetailArticleScreen';

class DetailArticle extends Component {
  componentDidMount() {
    const { id } = queryString.parse(this.props.location.search);
    this.props.viewDetailArticleClientById(id);
  }

  render() {
    const { isLoaded, detailArticle, err } = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }

    if (isLoaded && detailArticle) {
      return <DetailArticleScreen detailArticle={detailArticle} />
    }

    return (
      <Loading />
    );
  }
} 

const mapStateToProps = state => ({
  detailArticle: state.homeClientReducer.detailArticle,
  isLoaded: !state.homeClientReducer.isLoading,
  err: state.homeClientReducer.err,
  message: state.homeClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  viewDetailArticleClientById: (id) => dispatch(actions.viewDetailArticleClientById(id)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticle);