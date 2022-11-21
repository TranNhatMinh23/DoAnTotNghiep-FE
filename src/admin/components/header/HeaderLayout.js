import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import PropTypes from 'prop-types';
import styles from './HeaderLayout.module.css';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import avatarDefault from '../../assets/avatars/default1.jpg';
import { withTranslation } from 'react-i18next'; 
import flag_vn_circle from '../../../assets/icons/vietnam_icon.png';
import flag_en_circle from '../../../assets/icons/english_icon.png';
import { Select } from 'antd';

const { Option } = Select;
const { Header } = Layout;

class HeaderLayout extends Component {
  componentDidMount() {
    this.props.setAuthorizationToken();
  }

  onClicklogout = () => {
    this.props.logout();
  };

  render() {
    const { collapsed, userInfo, t, i18n } = this.props;
    const currentLanguage = i18n.language;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };
    const menu = (
      <Menu className={styles.dropdownAccount}>
        <Menu.Item key="1">
          <Link to="/profile">
            <Icon type="user" />{t('myAccount')}
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/profile">
            <Icon type="setting" />{t('setting')}
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/" onClick={this.onClicklogout}>
            <Icon type="logout" />{t('logout')}
          </Link>
        </Menu.Item>
      </Menu>
    );

    const menuLanguage = (
      <Select className={`select-languge ${styles.selectLanguage}`} defaultValue={currentLanguage} onChange={changeLanguage}>
        <Option value="vi">
          <img title="Tiếng Việt" className={styles.iconFlagLanguage} alt="logo" src={flag_vn_circle} /> Tiếng Việt
        </Option>
        <Option value="en">
          <img title="English" className={styles.iconFlagLanguage} alt="logo" src={flag_en_circle} /> English (UK)
        </Option>
      </Select>
    );

    return (
      <Header className={`row ${styles.header}`}>
        <div className="col-md-12">
          <Icon
            className={`trigger ${styles.iconCollapseHeader}`}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.onCollapse}
          />
          <span className={styles.nameCompany}>{userInfo.user.company.name === "System" ? t('system') : userInfo.user.company.name}</span>
          <div className={`avatar-header pull-right ${styles.headerWithAccountImage}`}>
            <a href={process.env.REACT_APP_BASE_URL} target="_blank" rel="noopener noreferrer">
            <Icon type="global" />{t('viewWebsite')}
            </a>
            {menuLanguage}
            <Dropdown overlay={menu}>
              <span className={`ant-dropdown-link ${styles.accountNameDisplay}`} >
                <Avatar size={35} src={userInfo.user.avatar_url ? process.env.REACT_APP_URL_API + userInfo.user.avatar_url : avatarDefault} />&nbsp;
                <span>{userInfo.user.name}</span> <Icon type="down" />
              </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }
}

HeaderLayout.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
  userInfo: PropTypes.object
}

HeaderLayout.defaultProps = {
  collapsed: false,
  userInfo: {
    user: ''
  }
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo
});

const mapDispatchToProps = dispatch => ({
  setAuthorizationToken: () => dispatch(actions.setAuthorizationToken()),
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderLayout));