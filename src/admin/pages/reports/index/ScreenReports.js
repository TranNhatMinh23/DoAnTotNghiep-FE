import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import ReportsTable from './ReportsTable';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ScreenReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listReports
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listReports !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listReports
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listReports, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;
    return (
      <DocumentTitle title={`Administrator - ${t('reportsManagement')}`}>
        <WidgetPage>
          <p className="title-widget">{t('reportsManagement')}</p>
          <div className="search-box"><SearchComponent placeholder={t('search')} onSearch={this.handleSearch} /></div>
          <ReportsTable listReports={searchingData} />
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

export default withTranslation()(ScreenReports);