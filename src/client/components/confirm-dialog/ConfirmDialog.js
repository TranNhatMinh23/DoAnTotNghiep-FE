import React, { Component } from 'react';
import stylesModule from './ConfirmDialog.module.css';
import { Modal, Button } from 'antd'; 
import PropTypes from 'prop-types'; 
import { withTranslation } from 'react-i18next';

class ConfirmDialog extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  }

  handleCancel = () => {
    this.props.handleClose();
  }

  render() {
    const { isLoading, content, t } = this.props;
    return (
      <Modal
        title={t('titleConfirmSubmitDialog')}
        style={{ top: 30 }} 
        data-backdrop="static" 
        data-keyboard="false"
        visible={this.props.visible}
        onCancel={this.handleCancel} 
        maskClosable={false}
        closable={false} 
        footer={[
          <Button key="back" onClick={this.handleCancel} disabled={isLoading}>
            {t('cancel')}
          </Button>,
          <Button key="submit" type="danger" loading={isLoading} onClick={this.handleSubmit}>
            {t('finish')}
          </Button>
        ]}
      >
        <p className={stylesModule.contentDialog}>{content === "hasTime" ? t('hasTime') : t('warningUnanswered', {numberUnanswered: content})}</p>
      </Modal>
    )
  }
} 

ConfirmDialog.propTypes = {
  isLoadedSubmitAnswer: PropTypes.bool,
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, 
}

ConfirmDialog.defaultProps = {
  isLoadedSubmitAnswer: false,
  isOpen: false, 
}

export default withTranslation()(ConfirmDialog);