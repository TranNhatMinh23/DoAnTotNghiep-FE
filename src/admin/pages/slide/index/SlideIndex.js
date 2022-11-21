import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import NotFound from '../../../components/not-found/NotFound';
import Loading from '../../../components/loading/Loading';
import ScreenSlide from './ScreenSlide';

class SlideIndex extends Component {
  componentDidMount() {
    this.props.getAllSlides();
  }

  render() {
    const { isLoaded, listAllSlides, err } = this.props;
    if (isLoaded && listAllSlides) { 
      return <ScreenSlide listAllSlides={listAllSlides} />
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
  listAllSlides: state.slideReducer.listAllSlides,
  isLoaded: !state.slideReducer.isLoading,
  err: state.slideReducer.err,
  message: state.slideReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllSlides: () => dispatch(actions.getAllSlides()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideIndex);