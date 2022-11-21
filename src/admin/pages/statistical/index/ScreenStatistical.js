import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility'; 
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';
import StatisticalTable from './StatisticalTable';
import styles from './ScreenStatistical.module.css';

class ScreenStatistical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listUserStatistical
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listUserStatistical !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listUserStatistical
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listUserStatistical, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;
    return (
      <DocumentTitle title={`Administrator - ${t('statisticalTitle')}`}>
        <WidgetPage>
        {/* Quan ly bao cao tung dot thi */}
          <p className="title-widget">{t('statisticalTitle')}: <span className={styles.StatisticalDescription}>{t('statisticalDescription')}</span></p>  
            <div className={styles.searchBox}>
            <SearchComponent placeholder={t('search')} onSearch={this.handleSearch} />
            </div>
          <StatisticalTable listData={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenStatistical);