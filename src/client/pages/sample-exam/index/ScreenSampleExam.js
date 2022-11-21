import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import ItemSample from './ItemSample';
import styles from './ScreenSampleExam.module.css';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

class ScreenSampleExam extends Component {
  onChangeCurrentPage = (page) => {
    this.props.getSampleExamsClient(page);
    this.props.history.push(`/sample-exams?page=${page}`);
  }

  render() {
    const { listSamples, t } = this.props;

    return (
      <DocumentTitle title='Practice Test Online'>
        <div className={`row ${styles.screenPractice}`}>
          <div className="col-md-12">
            <p className="title-page"><i className="fa fa-folder-open"></i>&nbsp;{t('sampleExams')}</p>
            {listSamples.data.length === 0 && <p>{t('noSampleExams')}</p>}
          </div>
          {listSamples.data.map(sampleExam => {
            return <ItemSample key={sampleExam.id} sampleExam={sampleExam} />
          })}
          {
            listSamples.total > 0 &&
            <div className="col-md-12 pagination-class">
              <Pagination
                pageSize={listSamples.per_page}
                current={listSamples.current_page}
                onChange={this.onChangeCurrentPage}
                defaultCurrent={listSamples.current_page}
                total={listSamples.total}
              />
            </div>
          }
        </div>
      </DocumentTitle>
    )
  }
};

export default withRouter(withTranslation()(ScreenSampleExam));