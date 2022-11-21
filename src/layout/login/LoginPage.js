import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import { withTranslation } from 'react-i18next';
import flag_vn from '../../assets/icons/flag_vn.jpg';
import flag_en from '../../assets/icons/flag_en.jpg';
import { Select, Icon } from 'antd';
const { Option } = Select;

class LoginPage extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    const { i18n, t } = this.props;
    const currentLanguage = i18n.language;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    return (
      <div className={styles.loginPage}>
        <div className={styles.formDisplay}>
          <div className={styles.chooseLanguage}>
            <Select className={`select-languge ${styles.selectLanguage}`} defaultValue={currentLanguage} onChange={changeLanguage}>
              <Option value="vi">
                <img title="Tiếng Việt" className={styles.iconFlagLanguage} alt="logo" src={flag_vn} /> Tiếng Việt
              </Option>
              <Option value="en">
                <img title="English" className={styles.iconFlagLanguage} alt="logo" src={flag_en} /> English (UK)
              </Option>
            </Select>
          </div>
          <div className={styles.formDisplayChildren}>
            <ToastContainer />
            <LoginForm />
            <p className={styles.goHomeLink}>
              <Link to="/">
                <Icon type="arrow-left" /><span>{t('goHome')}</span>
              </Link>
            </p>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, null)(withTranslation()(LoginPage));