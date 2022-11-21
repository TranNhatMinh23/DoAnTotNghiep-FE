import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import queryString from 'query-string';
import NotFoundPage from '../../components/not-found/NotFound';
import Loading from '../../components/loading/Loading';
import ViewMoreScreen from './ViewMoreScreen';

class ViewMoreIndex extends Component {
  componentDidMount() {
    const { type, page } = queryString.parse(this.props.location.search);
    this.props.getAllArticleClient(type, page);
  }

  render() {
    const { type } = queryString.parse(this.props.location.search);
    const { isLoaded, dataViewAll, err } = this.props;
    if (isLoaded && err) {
      return <NotFoundPage />
    }

    if (isLoaded && dataViewAll) {
      return <ViewMoreScreen
        dataViewAll={dataViewAll}
        getAllArticleClient={this.props.getAllArticleClient}
        type={type}
      />
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  dataViewAll: state.homeClientReducer.dataViewAll,
  isLoaded: !state.homeClientReducer.isLoading,
  err: state.homeClientReducer.err,
  message: state.homeClientReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllArticleClient: (type, page) => dispatch(actions.getAllArticleClient(type, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMoreIndex);