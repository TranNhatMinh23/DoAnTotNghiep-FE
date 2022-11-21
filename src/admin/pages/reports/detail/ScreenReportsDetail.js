import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import ReportsDetailTable from './ReportsDetailTable';
import CustomPageHeader from '../../../components/common/custom-page-header/CustomPageHeader';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';
import { Button, Icon, Badge } from 'antd';
import styles from './ReportsDetail.module.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import { groupDataExamReportChart } from '../../../../shared/function';

class ScreenReportsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.detailReport.details
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detailReport.details !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.detailReport.details
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.detailReport.details, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { detailReport, t } = this.props;
    const { searchingData } = this.state;
    const data = groupDataExamReportChart(this.props.detailReport.details);

    return (
      <DocumentTitle title={`Administrator - ${t('detailReport')}`}>
        <WidgetPage>
          <CustomPageHeader to="/reports" title={`${t('detailReport')} - ${detailReport.exam}`} />
          <div className={styles.titleChart}>
            <p><Icon type="border-outer" />&nbsp;{t('showChart')}</p>
            <p>{detailReport.exam_status ?
              <>
                <Badge color="green" status="processing" />
                <span>{t('_onGoing')}</span>
              </>
              :
              <>
                <Badge status="error" />
                <span>{t('_stopped')}</span>
              </>}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              barSize={30}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis label={{ value: t('numOfExams'), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar name={t('numOfExams')} dataKey="count" fill="#82ca9d" >
                <LabelList dataKey="count" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className={styles.titleDetailResultTable}><Icon type="border-outer" />&nbsp;{t('detailResult')}</p>
          <div className={styles.topTableDetailResult}>
            <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            <a href={process.env.REACT_APP_AXIOS_API + `/api/reports/export/${detailReport.exam_id}?token=${this.props.token}`}>
              <Button><i className={`fa fa-external-link ${styles.iconBtnExport}`}></i>{t('exportReport')}</Button>
            </a>
          </div>
          <ReportsDetailTable detailReport={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

ScreenReportsDetail.propTypes = {
  detailReport: PropTypes.object
};

export default withTranslation()(ScreenReportsDetail);