import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteCategory.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteCategory extends Component {

  handleOk = () => {
    this.props.deleteCategory(this.props.categoryDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { t } = this.props;
    return (
      <Modal
        title={t('confirmDeleteCategory')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('doYouWantDel')} <strong>{this.props.categoryDelete.name}</strong> ?</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoaded: !state.categoryReducer.isLoading,
  err: state.categoryReducer.err,
  message: state.categoryReducer.message,
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: (categoryId) => dispatch(actions.deleteCategory(categoryId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteCategory));