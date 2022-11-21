import React, { Component } from 'react';
import { Modal, Tag } from 'antd';
import moment from 'moment';
import styles from './ModalDetailContact.module.css';
import { withTranslation } from 'react-i18next';

class ModalDetailContact extends Component {
  handleCancel = () => {
    this.props.onCloseDialog();
  }

  render() {
    const { detailInfo, t } = this.props;

    return (
      <Modal
        title={t('detailContact')}
        style={{ top: 20 }}
        footer={null}
        width="60%"
        visible={this.props.visible}
        cancelText='Close'
        onCancel={this.handleCancel}
      >
        <div className={styles.contentModel}> 
          <div><span>{t('name')}:</span>{detailInfo.username}</div>
          <div><span>Email:</span>{detailInfo.email}</div>
          <div><span>{t('sentDate')}:</span>{moment(detailInfo.created_at).format('DD/MM/YYYY, hh:mm:ss A')}</div>
          <div><span>{t('status')}:</span><Tag color={detailInfo.status ? "#87d068" : 'red'}>{detailInfo.status ? t('pendding') : t('processed')}</Tag></div >
          <div><span>{t('content')}:</span>{detailInfo.content}</div>
        </div>
      </Modal>
    )
  }
}

export default withTranslation()(ModalDetailContact);