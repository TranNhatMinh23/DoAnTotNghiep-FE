import React, { Component, Fragment } from 'react'; 
import { searchByText } from '../../../../shared/utility'; 
import ContactPendingTable from './ContactPendingTable'; 
import SearchComponent from '../../../components/common/search/Search';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class ContactPendingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchingData: this.props.listPenddingContacts
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listPenddingContacts !== this.state.searchingData) {
      this.setState({
        searchingData: nextProps.listPenddingContacts
      })
    };
  }

  handleSearch = (searchText = '') => {
    let matchingData = searchByText(this.props.listPenddingContacts, searchText);
    this.setState({
      searchingData: matchingData
    });
  }

  render() {
    const { searchingData } = this.state;
    const { t } = this.props;

    return (
      <Fragment>
        <WidgetPage>
          <p className="title-widget">{t('pendingContact')}</p>
          <div className="search-box"><SearchComponent placeholder={t('search')} onSearch={this.handleSearch} /></div> 
          <ContactPendingTable listPenddingContacts={searchingData} />
        </WidgetPage>
      </Fragment>
    )
  }
}

export default withTranslation()(ContactPendingScreen);