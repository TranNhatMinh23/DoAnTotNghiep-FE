import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import ContentPreview from './ContentPreview';
import CompletionRules from './CompletionRules';
import styles from './PreviewExam.module.css';
import { Button } from 'antd';
import TitleFrame from '../../../../components/title-frame/TitleFrame';
import Loading from '../../../../components/loading/Loading';
import { withTranslation } from 'react-i18next';

class PreviewExam extends Component {
  componentDidMount() {
    const { examId } = queryString.parse(this.props.location.search);
    this.props.getExamBeforeTakenById(examId);
  }

  render() {
    const { isLoaded, detailExamBeforeTaken, t , err, message } = this.props;
    if (isLoaded && detailExamBeforeTaken) {
      return (
        <DocumentTitle title={`Begin Test - ${detailExamBeforeTaken.name}`}>
        <div className={`row ${styles.contentPreviewExam}`}>
          <div className="col-md-12">
            <TitleFrame description={detailExamBeforeTaken.description}>{detailExamBeforeTaken.name}</TitleFrame>
          </div>
          <div className={`col-md-6 ${styles.leftContentWithStartBtn}`}>
            <i className="fa fa-mortar-board"></i><br />
            <Link to={`/view-exam?examId=${detailExamBeforeTaken.id}`}>
              <Button className={styles.btnTakeTest}>{t('begintest')}</Button>
            </Link> 
          </div>
          <div className={`col-md-6 ${styles.rightContent}`}>
            <ContentPreview />
            <CompletionRules />
          </div>
        </div>
        </DocumentTitle>
      );
    }

    if (isLoaded && err) {
      return (
        <div className={styles.errorMessage}>
          {message}
        </div>
      )
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.examClientReducer.isLoading,
  err: state.examClientReducer.err,
  message: state.examClientReducer.message,
  detailExamBeforeTaken: state.examClientReducer.detailExamBeforeTaken
});

const mapDispatchToProps = dispatch => ({
  getExamBeforeTakenById: (examId) => dispatch(actions.getExamBeforeTakenById(examId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PreviewExam));