import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import NotFoundPage from '../../../../../../components/not-found/NotFound';
import Loading from '../../../../../../components/loading/Loading';
import ScreenDetailPartSix from './ScreenDetailPartSix';

class DetailPartSix extends Component{

  componentDidMount() {
    //get detail part by partId
    let { partId, examQuestionId } = this.props.match.params;
    this.props.getExamQuestionById(examQuestionId);  
    this.props.getDetailInfoPart(partId);
  }

  render(){
    const { isLoaded, detailPart, detailExamQuestion, err } = this.props;

    if (isLoaded && detailPart && detailExamQuestion) {
      return <ScreenDetailPartSix detailExamQuestion={detailExamQuestion} detailPart={detailPart} />
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
  isLoaded: !state.detailPartReducer.isLoading,
  err: state.detailPartReducer.err,
  message: state.detailPartReducer.message,
  detailPart: state.detailPartReducer.detailPart,
  detailExamQuestion: state.examquestionReducer.detailExamQuestion
});

const mapDispatchToProps = dispatch => ({
  getDetailInfoPart: (partId) => dispatch(actions.getDetailInfoPart(partId)),
  getExamQuestionById: (examQuestionId) => dispatch(actions.getExamQuestionById(examQuestionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPartSix);