import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import CustomPageHeader from '../../../components/common/custom-page-header/CustomPageHeader';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';
import {
  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Line
} from 'recharts';
import { groupDataStatisticalOfUserChart } from '../../../../shared/function';
import StatisticalDetailTable from './StatisticalDetailTable';
import styles from './ScreenStatisticalDetail.module.css';
import { Icon } from 'antd';
 
class ScreenStatisticalDetail extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.detailStatisticalOfUser.detail_statistical
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detailStatisticalOfUser.detail_statistical !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.detailStatisticalOfUser.detail_statistical
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.detailStatisticalOfUser.detail_statistical, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  onPrint = () => {
    window.print();
  }

  renderCustomTooltip = ({ active, payload, label }) => {
    if (active) {
      const dataLoaded = payload[0].payload; 
      const { t } = this.props; 
      return (
        <div className={styles.customTooltip}>
          <p className={styles.titleOfTooltip}>{dataLoaded.detailExam && dataLoaded.detailExam.name}</p>
          <span>{`${t('dateTaken')} : ${dataLoaded.dateTaken}`}</span>
          <ul>
            <li>{`${t('numListeningCorrect')}: ${dataLoaded.num_reading} => ${t('listening_score')}: ${dataLoaded.listening_score}`}</li>
            <li>{`${t('numReadingCorrect')}: ${dataLoaded.num_listening} => ${t('reading_score')}: ${dataLoaded.reading_score}`}</li>
            <li>{t('total_score')}: {dataLoaded.total_score}</li>
          </ul>  
        </div>
      );
    } 
    return null;
  };

  render() {
    const { detailStatisticalOfUser, t } = this.props; 
    const { searchingData } = this.state; 
    const currentUser = detailStatisticalOfUser.user;
    const data = groupDataStatisticalOfUserChart(detailStatisticalOfUser.detail_statistical); 
    
    return (
      <DocumentTitle title={`Administrator - ${t('detailStatistical')}`}>
        <WidgetPage>
          <CustomPageHeader to="/statistical" title={t('detailStatistical')} subTitle={currentUser.name + ' ('+ currentUser.email+')'} />
          <ResponsiveContainer width="100%" height={420}>
            <ComposedChart
              data={data}
              barSize={20}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }} 
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" name="222" />
              <YAxis domain={[0, 1100]} ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 990]} />
              <Tooltip content={this.renderCustomTooltip} />
              <Legend />
              <Bar name={t('listening_score')} dataKey="listening_score" fill="#8884d8" />
              <Bar name={t('reading_score')} dataKey="reading_score" fill="#82ca9d" />
              <Line name={t('total_score')} type="monotone" dataKey="total_score" stroke="#ff7300" />
            </ComposedChart >
          </ResponsiveContainer>
          <p className={styles.titleChart}>{t('titleStatisOfUserChart')}</p>

          <p><Icon type="border-outer" />&nbsp;{t('detailResult')}</p>
          <div className={styles.searchBox}>
            <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
          </div>
          <StatisticalDetailTable detailData={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    );
  }
}

ScreenStatisticalDetail.propTypes = {
  detailReport: PropTypes.object
};

export default withTranslation()(ScreenStatisticalDetail);