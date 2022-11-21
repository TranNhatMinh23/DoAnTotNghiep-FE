import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import styles from './SignupForm.module.css';
import { Form, Icon, Input, Button } from 'antd';
import {
  emptyMessage,
  incorrectEmailFormat,
  confirmNoMatchMessage,
  minInvalidMessage
} from '../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class SignupForm extends Component {
  state = {
    confirmDirty: false
  };

  componentDidMount() {
    this.props.clearCacheLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signupStatus === true) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          name: values.name,
          email: values.email,
          password: values.password
        };
        this.props.signupForPersonal(data);
      }
    });
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
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, err, message, signupStatus, signupResponse, t } = this.props;
    return (
      <>
        <p className={styles.titleLogin}>{t('signupForPersonal')}</p>
        <p className={styles.displayErrLogin}>{err && message}</p>
        {
          signupStatus ?
            <div className={styles.SignupResponse}>
              <p>{signupResponse.message}</p>
              {/* <p className={styles.optionChooseSignup}><Link to="/"><Icon type="arrow-left" />&nbsp;{t('back')}</Link></p> */}
            </div>
            :
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [
                    { required: true, message: emptyMessage("Name") }
                  ],
                })(
                  <Input
                    prefix={<Icon type="user" className="icon-inner-input" />}
                    placeholder={t('fullName')}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: incorrectEmailFormat },
                    { required: true, message: emptyMessage("Email") }
                  ],
                })(
                  <Input
                    prefix={<Icon type="mail" className="icon-inner-input" />}
                    placeholder="email"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: emptyMessage("Password") },
                  { min: 8, message: minInvalidMessage("Password", 8) },
                  { validator: this.validateToNextPassword }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" className="icon-inner-input" />}
                    type="password"
                    placeholder={t('password')}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('confirm', {
                  rules: [{ required: true, message: emptyMessage("Confirm password") },
                  { min: 8, message: minInvalidMessage("Confirm password", 8) },
                  { validator: this.compareToFirstPassword }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" className="icon-inner-input" />}
                    type="password"
                    placeholder={t('confirmPass')}
                  />,
                )}
              </Form.Item> 
              <Form.Item className={styles.btnSubmitAndLinkWidget}>
                <Button className={`login-form-button ${styles.btnSubmitLogin}`} block type="primary" htmlType="submit" loading={isLoading}>
                  {t('signup')}
                </Button>
                <p className={styles.optionChooseSignup}><Link to="/login">{t('login')} </Link> {t('or')} <Link to="/signup/company"> {t('signupForCompany')}</Link></p>
              </Form.Item>
            </Form>
        }
      </>
    )
  }
}

SignupForm.propTypes = {
  isLoading: PropTypes.bool,
  err: PropTypes.bool,
  message: PropTypes.string,
  signup: PropTypes.func,
  clearCacheLogin: PropTypes.func,
  signupStatus: PropTypes.bool
}

SignupForm.defaultProps = {
  message: '',
  isLoading: false
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  err: state.authReducer.err,
  message: state.authReducer.message,
  signupStatus: state.authReducer.signupStatus,
  signupResponse: state.authReducer.signupResponse
});

const mapDispatchToProps = dispatch => ({
  signupForPersonal: (data) => dispatch(actions.signupForPersonal(data)),
  clearCacheLogin: () => dispatch(actions.clearCacheLogin())
});

const WrappedNormalSignupForm = Form.create({ name: 'normal_signup' })(SignupForm)

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedNormalSignupForm));