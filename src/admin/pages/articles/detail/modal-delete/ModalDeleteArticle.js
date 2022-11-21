import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './ModalDeleteArticle.module.css';
import * as actions from '../../../../../store/actions/index';
import { withTranslation } from 'react-i18next';

class ModalDeleteArticle extends Component {

  handleOk = () => {
    this.props.deleteArticle(this.props.articleDelete.id)
  }

  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { t } = this.props;

    return (
      <Modal
        title={t('confirmDeleteArticle')}
        visible={this.props.visible}
        okText={t('yes')}
        okType='danger'
        cancelText={t('no')}
        onOk={this.handleOk}
        confirmLoading={this.props.isLoading}
        onCancel={this.handleCancel}
      >
        <p className={styles.message}>{t('deleteArticleText')}</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.articlesReducer.isLoading,
  err: state.articlesReducer.err,
  message: state.articlesReducer.message,
});

const mapDispatchToProps = dispatch => ({
  deleteArticle: (articleId) => dispatch(actions.deleteArticle(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ModalDeleteArticle));