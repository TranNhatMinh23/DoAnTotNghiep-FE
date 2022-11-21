import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { incorrectEmailFormat, emptyMessage, minInvalidMessage } from '../../constants/validateInputMessage';
import { withTranslation } from 'react-i18next';

class LoginForm extends Component {
  componentDidMount() {
    this.props.clearCacheLogin();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          email: values.email,
          password: values.password
        };
        this.props.login(data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, err, message, t } = this.props;
    return (
      <>
        <p className={styles.titleLogin}>{t('login')}</p>
        <p className={styles.displayErrLogin}>{err && message}</p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: incorrectEmailFormat },
                { required: true, message: emptyMessage("Email") }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: emptyMessage("Password") },
                      { min: 8, message: minInvalidMessage("Password", 8) }
            ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder={t('password')}
              />,
            )}
          </Form.Item>
          <Form.Item className={styles.cbRemember}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(<Checkbox>{t('rememberMe')}</Checkbox>)}
            {/* <span className={styles.spanForgotPassword}><Link to="/signup">{t('forgotPassword')}</Link></span> */}
          </Form.Item>
          <Form.Item className={styles.btnSubmitAndLinkWidget}>
            <Button className={`login-form-button ${styles.btnSubmitLogin}`} block type="primary" htmlType="submit" loading={isLoading}>
              {t('_login')}
            </Button>
            <p className={styles.optionChooseSignup}>{t('or')} <Link to="/signup">{t('registerNow')}</Link></p>
          </Form.Item>
        </Form>
      </>
    )
  }
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  err: PropTypes.bool,
  message: PropTypes.string,
  login: PropTypes.func,
  clearCacheLogin: PropTypes.func
}

LoginForm.defaultProps = {
  message: '',
  isLoading: false
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  err: state.authReducer.err,
  message: state.authReducer.message,
});

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(actions.login(data)),
  clearCacheLogin: () => dispatch(actions.clearCacheLogin())
});

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm)

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(WrappedNormalLoginForm));