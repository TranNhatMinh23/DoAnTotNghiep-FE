import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteExamQuestion.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteExamQuestion extends Component {

  handleOk = () => {
    this.props.deleteExamQuestion(this.props.examQuestionDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { t } = this.props;
    return (
      <Modal
        title={t('confirmDelExamQuestionTitleDialog')}
        visible={this.props.visible}
        okText={t('delete')}
        okType='danger'
        cancelText={t('cancel')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('doYouWantDel')} <strong>{this.props.examQuestionDelete.name}</strong> ?</p>
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
  deleteExamQuestion: (examQuestionId) => dispatch(actions.deleteExamQuestion(examQuestionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteExamQuestion));