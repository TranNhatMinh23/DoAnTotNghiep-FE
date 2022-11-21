import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import MyReportsTable from './MyReportsTable';
import styles from './ScreenMyReports.module.css'; 
import { withTranslation } from 'react-i18next';
import MySamplesReportsTable from './MySamplesReportsTable';

class ScreenMyReports extends Component { 
  render() {
    const { listMyReports, listSampleExamReports } = this.props; 
    const { t } = this.props;
    return (
      <DocumentTitle title='My reports'>
        <div className={styles.widgetMyReports}>
          <p className="title-page"><i className="fa fa-fa"></i>&nbsp;{t('myReports')}</p> 
          <MyReportsTable listMyReports={listMyReports} />
          <MySamplesReportsTable listSamplesReports={listSampleExamReports} />
        </div>
      </DocumentTitle>
    );
  }
}

ScreenMyReports.propTypes = {
  listMyReports: PropTypes.array,
  listSampleExamReports: PropTypes.array
};

export default withTranslation()(ScreenMyReports);