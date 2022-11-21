import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import { Form, Input, Button, Radio } from 'antd';
import CustomPageHeader from '../../../../components/common/custom-page-header/CustomPageHeader';
import styles from './AddNewUserForm.module.css';
import {
  incorrectEmailFormat,
  emptyMessage,
  minInvalidMessage,
  confirmNoMatchMessage
} from '../../../../../constants/validateInputMessage';
import * as defineConst from '../../../../../constants/defineConst';
import WidgetPage from '../../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';

class AddNewUserForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(confirmNoMatchMessage);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPasword'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          email: values.email,
          password: values.password,
          name: values.name,
          gender: values.gender,
          role_id: values.role,
          active_status: 0
        };

        this.props.createNewUser(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, t } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 5 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        md: {
          offset: 5
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <DocumentTitle title='Administrator - Create new user'>
        <WidgetPage>
          <CustomPageHeader to="/users-management" title={t('addNewUsers')} />    
          <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles.addUserForm}>
            <Form.Item label={t('fullName')}>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: emptyMessage("Full name") },
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Email">
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: incorrectEmailFormat },
                  { required: true, message: emptyMessage("Email") }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={t('gender')}>
              {getFieldDecorator('gender', {
                rules: [{ required: true, message: emptyMessage("Gender") }]
              })(
                <Radio.Group>
                  <Radio value="male">{t('male')}</Radio>
                  <Radio value="female">{t('female')}</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label={t('password')}>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: emptyMessage("Password") },
                  { min: 8, message: minInvalidMessage("Password", 8) },
                  { validator: this.validateToNextPassword }
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label={t('confirmPass')}>
              {getFieldDecorator('confirmPasword', {
                rules: [
                  { required: true, message: emptyMessage("Confirm password") },
                  { min: 8, message: minInvalidMessage("Confirm password", 8) },
                  { validator: this.compareToFirstPassword }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item label={t('role')}>
              {getFieldDecorator('role', {
                rules: [
                  { required: true, message: emptyMessage("Role") }
                ]
              })(
                <Radio.Group>
                  <Radio key="1" value={defineConst.ROLE_ADMIN}>Admin</Radio>
                  <Radio key="2" value={defineConst.ROLE_MEMBER}>{t('member')}</Radio>
                </Radio.Group>
              )
              }
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {t('createNew')}
              </Button>
            </Form.Item>
          </Form>
        </WidgetPage>
      </DocumentTitle>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(AddNewUserForm);

const mapStateToProps = state => ({
  isLoading: state.userReducer.isLoading,
  err: state.userReducer.err,
  message: state.userReducer.message,
});

const mapDispatchToProps = dispatch => ({
  createNewUser: (data) => dispatch(actions.createNewUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedRegistrationForm));