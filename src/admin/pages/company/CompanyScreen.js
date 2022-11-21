import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import CompanyTable from './CompanyTable';
import WidgetPage from '../../components/common/widget-page/WidgetPage';
import SearchComponent from '../../components/common/search/Search';
import { searchByText } from '../../../shared/utility';
import { withTranslation } from 'react-i18next';

class CompanyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.allCompany
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allCompany !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.allCompany
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.allCompany, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state; 
    const { t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('companyManagement')}`}>
      <WidgetPage>
        <p className="title-widget">{t('companyManagement')}</p>
        <div className="search-box"><SearchComponent placeholder={t('search')} onSearch={this.handleSearch} /></div>
        <CompanyTable allCompany={searchingData} />
      </WidgetPage>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(CompanyScreen);