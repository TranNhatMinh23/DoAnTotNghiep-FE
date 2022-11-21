import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import Loading from '../../../../components/loading/Loading';
import NotFoundPage from '../../../../components/not-found/NotFound';
import EditSlideForm from './EditSlideForm';

class EditSlide extends Component {
  componentDidMount() {
    let { slideId } = this.props.match.params;
    this.props.getSlideById(slideId); 
  }

  render() {

    const { isLoaded, detailSlide, err } = this.props;

    if (isLoaded && detailSlide) {
      return <EditSlideForm detailSlide={detailSlide} />
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
  isLoaded: !state.slideReducer.isLoading,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
  detailSlide: state.slideReducer.detailSlide 
});

const mapDispatchToProps = dispatch => ({
  getSlideById: (slideId) => dispatch(actions.getSlideById(slideId)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSlide);