import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import { Button } from 'antd';
import styles from './ScreenExamSchedule.module.css';
import ExamScheduleTable from './ExamScheduleTable';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenExamSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listExamSchedule
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listExamSchedule !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listExamSchedule
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listExamSchedule, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('examManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('examManagement')}</p>
          <div className={styles.topTable}>
            <Link to="/exam-schedules/add">
              <Button icon="plus" type="green" className={styles.btnAddNew}>
              {t('createNew')}
             </Button>
            </Link>
            <div className="pull-right">
              <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          </div>
          <ExamScheduleTable listExamSchedule={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenExamSchedule);