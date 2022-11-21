import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteExamSchedule.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteExamSchedule extends Component {

  handleOk = () => {
    this.props.deleteExamSchedule(this.props.examScheduleDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { t } = this.props;

    return (
      <Modal
        title={t('confirmDeleteExams')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('doYouWantDel')} <strong>{this.props.examScheduleDelete.name}</strong> ?</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.userReducer.isLoading,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  deleteExamSchedule: (examScheduleId) => dispatch(actions.deleteExamSchedule(examScheduleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteExamSchedule));