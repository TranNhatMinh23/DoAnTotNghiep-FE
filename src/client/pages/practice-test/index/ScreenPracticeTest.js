import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import ItemExamInPractice from './ItemExamInPractice';
import styles from './ScreenPracticeTest.module.css';
import { Pagination, Select, Badge } from 'antd';
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';

const { Option } = Select;

class ScreenPracticeTest extends Component {
  constructor(props){
    super(props); 
    this.state = {
      viewBy: queryString.parse(this.props.location.search).by ? queryString.parse(this.props.location.search).by : 'all'
    }
  }

  onChangeCurrentPage = (page) => {
    const { viewBy } = this.state; 
    this.props.getAllExamPractice(page, viewBy);
    this.props.history.push(`/practice-test?by=${viewBy}&page=${page}`);
  }

  changeViewBy = (by) => {
    this.setState({
      viewBy: by
    }, () => {   
      this.props.getAllExamPractice(1, by);
      this.props.history.push(`/practice-test?by=${by}&page=1`);
    });
  }

  render() {
    const { viewBy } = this.state;
    const { listExams, t } = this.props;

    return (
      <DocumentTitle title='Practice Test Online'>
        <div className={`row ${styles.screenPractice}`}>
          <div className="col-md-12">
            <div className={styles.headerViewExamsPage}>
              <p className="title-page"><i className="fa fa-clock-o"></i>&nbsp;{t('practiceTest')}</p>
              <div className={styles.selectViewExams}>
                <p>{t('viewBy')}: </p>
                <Select defaultValue={viewBy} className={styles.selectOptionView} onChange={this.changeViewBy}>
                  <Option value="all"><Badge status="default" />{t('all')}</Option>
                  <Option value="ongoing"><Badge status="success" />{t('onGoingExams')}</Option>
                  <Option value="upcomming"><Badge status="cyan" />{t('isCommingExam')}</Option>
                  <Option value="expired"><Badge status="error" />{t('expiredExam')}</Option> 
                </Select>
              </div>
            </div>
            {listExams.data.length === 0 && <p>{t('noPracticeTests')}</p>}
          </div>
          {listExams.data.map((detailExam, i) => {
            return <ItemExamInPractice key={i} detailExam={detailExam} />
          })}
          {
            listExams.total > 0 &&
            <div className="col-md-12 pagination-class">
              <Pagination
                pageSize={listExams.per_page}
                current={listExams.current_page}
                onChange={this.onChangeCurrentPage}
                defaultCurrent={listExams.current_page}
                total={listExams.total}
              />
            </div>
          }
        </div>
      </DocumentTitle>
    )
  }
};

export default withRouter(withTranslation()(ScreenPracticeTest));