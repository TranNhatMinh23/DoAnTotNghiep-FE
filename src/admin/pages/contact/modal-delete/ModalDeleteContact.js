import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteContact.module.css';
import * as actions from '../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteContact extends Component {

  handleOk = () => { 
    let contactType = this.props.contactType ? "Pending" : "Processed";
    this.props.deleteContact(this.props.contactId, contactType);
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  } 

  render() {
    const { t } = this.props;

    return (
      <Modal
        title={t('confirmDeleteContact')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        confirmLoading={this.props.isLoading}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('confirmDeleteTextContact')}</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.contactManagementReducer.isLoading,
  err: state.contactManagementReducer.err,
  message: state.contactManagementReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
  deleteContact: (contactId, type) => dispatch(actions.deleteContact(contactId, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteContact));