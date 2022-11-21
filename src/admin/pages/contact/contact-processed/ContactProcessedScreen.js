import React, { Component, Fragment } from 'react';
import SearchComponent from '../../../components/common/search/Search';
import { searchByText } from '../../../../shared/utility';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import ContactProcessedTable from './ContactProcessedTable';
import { withTranslation } from 'react-i18next';

class ContactProcessedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listProcessedContacts
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listProcessedContacts !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listProcessedContacts
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listProcessedContacts, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    return (
      <Fragment>
        <WidgetPage borderTopColor="#654321">
          <p className="title-widget">{t('processedContact')}</p>
          <div className="search-box"><SearchComponent placeholder={t('search')} onSearch={this.handleSearch} /></div> 
          <ContactProcessedTable listProcessedContacts={searchingData} /> 
        </WidgetPage>
      </Fragment>
    )
  }
}

export default withTranslation()(ContactProcessedScreen);