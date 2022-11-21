import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import queryString from 'query-string';
import ContentPreview from './ContentPreview';
import CompletionRules from './CompletionRules';
import styles from './PreviewSampleExam.module.css';
import { Button } from 'antd';
import TitleFrame from '../../../../components/title-frame/TitleFrame';
import Loading from '../../../../components/loading/Loading';
import NotFound from '../../../../components/not-found/NotFound';
import { withTranslation } from 'react-i18next';

class PreviewSampleExam extends Component {
  componentDidMount() {
    const { sampleExamId } = queryString.parse(this.props.location.search);
    this.props.getSampleExamClientBeforeTakenById(sampleExamId);
  }

  render() {
    const { isLoaded, detailSampleBeforeTaken, err, t } = this.props;
    if (isLoaded && detailSampleBeforeTaken) {
      return (
        <DocumentTitle title={`Begin Test - ${detailSampleBeforeTaken.name}`}>
        <div className={`row ${styles.contentPreviewExam}`}>
          <div className="col-md-12">
            <TitleFrame description={detailSampleBeforeTaken.description}>{detailSampleBeforeTaken.name}</TitleFrame>
          </div>
          <div className={`col-md-6 ${styles.leftContentWithStartBtn}`}>
            <i className="fa fa-mortar-board"></i><br />
            <Link to={`/view-sample-exam?sampleExamId=${detailSampleBeforeTaken.id}`}>
              <Button className={styles.btnTakeTest}>{t('beginSampleTest')}</Button>
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

    if(isLoaded && err) {
      return (
        <NotFound />
      );
    }

    return (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.sampleExamClientReducer.isLoading,
  err: state.sampleExamClientReducer.err,
  message: state.sampleExamClientReducer.message,
  detailSampleBeforeTaken: state.sampleExamClientReducer.detailSampleBeforeTaken
});

const mapDispatchToProps = dispatch => ({
  getSampleExamClientBeforeTakenById: (sampleExamId) => dispatch(actions.getSampleExamClientBeforeTakenById(sampleExamId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PreviewSampleExam));