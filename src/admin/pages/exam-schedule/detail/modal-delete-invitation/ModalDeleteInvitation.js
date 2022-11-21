import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteInvitation.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteInvitation extends Component {

  handleOk = () => {
    this.props.deleteEmailInvitation(this.props.dataDelete.id); 
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteEmailInvitedSuccess) {
      this.handleCancel(); 
    };
  }

  render() {
    const { t, isLoading } = this.props;

    return (
      <Modal
        title={t('delInvitation')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={isLoading}
      >
        <p className={styles.message}>{t('doYouWantDelInvitation')} <strong>{this.props.dataDelete.email}</strong> ?</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.examScheduleReducer.isLoadingDeleteEmailInvited,
  deleteEmailInvitedSuccess: state.examScheduleReducer.deleteEmailInvitedSuccess,
  err: state.examScheduleReducer.err,
  message: state.examScheduleReducer.message,
});

const mapDispatchToProps = dispatch => ({ 
  deleteEmailInvitation: (emailInvitationId) => dispatch(actions.deleteEmailInvitation(emailInvitationId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteInvitation));