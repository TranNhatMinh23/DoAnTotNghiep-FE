import React, { Component, Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import ContactPendingScreen from './contact-pendding/ContactPendingScreen';
import ContactProcessedScreen from './contact-processed/ContactProcessedScreen';
import { withTranslation } from 'react-i18next';

class ContactScreen extends Component {
  render() {
    const { listPenddingContacts, listProcessedContacts, t } = this.props;

    return (
      <DocumentTitle title={`Administrator - ${t('contactsManagement')}`}>
        <Fragment>
          <ContactPendingScreen listPenddingContacts={listPenddingContacts} />
          <ContactProcessedScreen listProcessedContacts={listProcessedContacts} />
        </Fragment>
      </DocumentTitle>
    );
  }
}

export default withTranslation()(ContactScreen);