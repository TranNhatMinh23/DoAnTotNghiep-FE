import React, { Component } from 'react';
import PropTypes from 'prop-types';   
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import NotFoundPage from '../../components/not-found/NotFound';
import Loading from '../../components/loading/Loading';
import ContactScreen from './ContactScreen';

class Contact extends Component {
  componentDidMount() {
    this.props.getAllContacts(); 
  }

  render() {
    const { isLoaded, err, listProcessedContacts, listPenddingContacts } = this.props; 
    
    if (isLoaded && !err) {
      return <ContactScreen listPenddingContacts={listPenddingContacts} listProcessedContacts={listProcessedContacts} />
    }

    if (isLoaded && err) {
      return <NotFoundPage />
    }

    return (
      <Loading />
    );
  }
}

Contact.propTypes = {
  listContacts: PropTypes.array
};

const mapStateToProps = state => ({
  listPenddingContacts: state.contactManagementReducer.listPenddingContacts,
  listProcessedContacts: state.contactManagementReducer.listProcessedContacts,
  isLoaded: !state.contactManagementReducer.isLoading,
  err: state.contactManagementReducer.err,
  message: state.contactManagementReducer.message,
});

const mapDispatchToProps = dispatch => ({
  getAllContacts: () => dispatch(actions.getAllContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);