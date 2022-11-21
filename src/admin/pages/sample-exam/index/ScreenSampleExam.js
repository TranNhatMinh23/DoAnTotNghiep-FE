import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import { Button } from 'antd';
import styles from './ScreenSampleExam.module.css';
import SampleExamTable from './SampleExamTable';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenSampleExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listSampleExams
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listSampleExams !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listSampleExams
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listSampleExams, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;
    return (
      <DocumentTitle title={`Administrator - ${t('sampleExamManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('sampleExamManagement')}</p>
          <div className={styles.topTable}>
            <Link to="/sample-exams/add">
              <Button icon="plus" type="green" className={styles.btnAddNew}>
                {t('createNew')}
              </Button>
            </Link>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <SampleExamTable listSampleExams={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenSampleExam);