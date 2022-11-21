import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteExamQuestionScore.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteExamQuestionScore extends Component {

  handleOk = () => {
    this.props.deleteExamQuestionScore(this.props.examQuestionScoreDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { t } = this.props;
    return (
      <Modal
        title={t('confirmDeleteScoreMapping')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('confirmTextDeleteScoreMapping')}: <strong>{this.props.examQuestionScoreDelete.name}</strong> ?</p>
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
  deleteExamQuestionScore: (examQuestionId) => dispatch(actions.deleteExamQuestionScore(examQuestionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteExamQuestionScore));