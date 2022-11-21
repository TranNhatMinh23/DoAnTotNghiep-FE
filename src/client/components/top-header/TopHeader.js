import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import * as actions from '../../../store/actions/index';
import { Link } from 'react-router-dom';
import styles from './TopHeader.module.css';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import flag_vn from '../../../assets/icons/vietnam_icon.png';
import flag_en from '../../../assets/icons/english_icon.png';

class TopHeader extends Component {
  logout = () => {
    this.props.logout();
  }

  render() {
    const { isAuthenticated, userInfo, t, i18n } = this.props;
    const currentLanguage = i18n.language;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    const roleManagement = ["Admin", "Manager"];
    const isInRoleManagement = roleManagement.includes(userInfo && userInfo.user.role.name);

    const menu = (
      <Menu className={styles.detailMenuUser}>
        <Menu.Item>
          <Icon type="user" />
          <Link to="/my-profile">{t('profile')}</Link>
        </Menu.Item>
        <Menu.Item>
          <Icon type="trophy" />
          <Link to="/my-reports">{t('myReports')}</Link>
        </Menu.Item>
        <Menu.Item>
          <Icon type="logout" /> 
          <Link to="/" onClick={this.logout}>{t('logout')}</Link>
          {/* <span onClick={this.logout}>{t('logout')}</span> */}
        </Menu.Item> 
      </Menu>
    );

    return (
      <div className={`container-fluid ${styles.topHeader}`}>
        <div className="row">
          <div className={`col-md-6 ${styles.topLeftHeader}`}>
            <ul className={styles.ulMenu}>
              <li className={styles.liFlagLanguage}>
                {currentLanguage === 'vi' ?
                  <img title="English" className={styles.iconFlagLanguage} onClick={() => changeLanguage('en')} alt="logo" src={flag_vn} />
                  :
                  <img title="Tiếng Việt" className={styles.iconFlagLanguage} onClick={() => changeLanguage('vi')} alt="logo" src={flag_en} />
                }
              </li>
              <li>{t('today')}, {moment().format('DD/MM/YYYY')}</li>
              <li>
                <i className="fa fa-phone"></i>&nbsp;Hotline: <a href="tel:0966581498">0966581498</a>
              </li>
            </ul>
          </div>
          <div className={`col-md-6 ${styles.topRightHeader}`}>
            {
              isAuthenticated ?
                <>
                  <Dropdown overlay={menu}>
                    <Link className="ant-dropdown-link" to="#">
                      {t('hello')}, {userInfo.user.name} ! <Icon type="down" />
                    </Link>
                  </Dropdown>
                  {isInRoleManagement &&
                    <a href={process.env.REACT_APP_BASE_URL + '/admin'} rel="noopener noreferrer" target="_blank"><Icon type="global" /> {t('management')}</a>
                  }
                  {/* <span onClick={this.logout}>{t('logout')}<i className="fa fa-sign-out"></i></span> */}
                </>
                :
                <>
                  <Link to="/signup">{t('signup')}</Link>
                  <Link to="/login"><i className="fa fa-sign-in"></i>{t('login')}</Link>
                </>
            }
          </div>
        </div>
      </div>
    )
  }
}

TopHeader.propTypes = {
  userInfo: PropTypes.any,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func
}

TopHeader.defaultProps = {
  userInfo: {
    user: {
      name: '',
      role: ''
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  userInfo: state.authReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TopHeader));