import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../../../store/actions/index';
import styles from './SecurityInfomation.module.css';
import { emptyMessage, minInvalidMessage } from '../../../../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class SecurityInfomation extends Component {
  state = {
    confirmDirty: false
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          oldpassword: values.oldpassword,
          password: values.password
        };
        let userId = this.props.userInfo.id;
        this.props.updatePassword(userId, data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, t } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const buttonItemLayout = {
      wrapperCol: { span: 16, offset: 7 },
    };

    return (
      <div className={`user-info-page ${styles.securityInfomation}`}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label={t('oldPass')}>
            {getFieldDecorator('oldpassword', {
              rules: [
                { required: true, message: emptyMessage("Old password") },
                { min: 8, message: minInvalidMessage("Old password", 8)}
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={t('password')}>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: emptyMessage("Password") },
                { min: 8, message: minInvalidMessage("Password", 8)},
                { validator: this.validateToNextPassword },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label={t('confirmPass')}>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: emptyMessage("Confirm password") },
                { min: 8, message: minInvalidMessage("Confirm password", 8)},
                { validator: this.compareToFirstPassword },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit" loading={isLoading}>{t('submit')}</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedSecurityAdminForm = Form.create({ name: 'security-admin-form' })(SecurityInfomation);

WrappedSecurityAdminForm.propTypes = {
  userInfo: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoadingUpdate,
  err: state.authReducer.err,
  message: state.authReducer.message,
});

const mapDispatchToProps = dispatch => ({
  updatePassword: (userId, data) => dispatch(actions.updatePassword(userId, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedSecurityAdminForm));