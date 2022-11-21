import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import styles from './SideBarLayout.module.css';
import { getActiveRouteAdminClass } from '../../../shared/utils';
import { withTranslation } from 'react-i18next';

const { Sider } = Layout;

class SideBarLayout extends Component {
  render() { 
    let currentPathName = window.location.pathname;
    const classActive = "ant-menu-item-selected";
    const homeActive = getActiveRouteAdminClass(currentPathName, "/admin/home") || getActiveRouteAdminClass(currentPathName, "/admin");
    const testManagementActive = currentPathName.match(/^\/admin\/exam-questions/) ? classActive : "";
    const examQuestionScoreActive = currentPathName.match(/^\/admin\/exam-question-scores/) ? classActive : "";
    const examScheduleActive = currentPathName.match(/^\/admin\/exam-schedules/) ? classActive : "";
    const reportsActive = currentPathName.match(/^\/admin(\/reports|\/detail-reports)/) ? classActive : "";
    const usersManagementActive = currentPathName.match(/^\/admin\/users-management/) ? classActive : "";
    const sampleExamsActive = currentPathName.match(/^\/admin\/sample-exams/) ? classActive : "";
    const categorytActive = getActiveRouteAdminClass(currentPathName, "/admin/category");
    const articlesActive = currentPathName.match(/^\/admin\/articles/) ? classActive : ""; 
    const slidesActive = currentPathName.match(/^\/admin\/slides/) ? classActive : "";
    const contactsActive = getActiveRouteAdminClass(currentPathName, "/admin/contacts");
    const companyManagementActive = currentPathName.match(/^\/admin\/companies/) ? classActive : "";
    const statisticalActive = currentPathName.match(/^\/admin\/statistical/) ? classActive : "";
    const { collapsed, userInfo, t } = this.props;

    const sidebarForAdmin = (
      <Menu theme="dark" mode="inline" className={styles.sidebarLayoutAdmin}>
        <Menu.Item key="1" className={homeActive}>
          <Link to="/home">
            <Icon type="home" />
            <span>{t('home')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" className={testManagementActive}>
          <Link to="/exam-questions">
            <Icon type="database" />
            <span>{t('examQuestions')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" className={examQuestionScoreActive}>
          <Link to="/exam-question-scores">
            <Icon type="file-done" />
            <span>{t('scoreMapping')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5" className={sampleExamsActive}>
          <Link to="/sample-exams">
            <Icon type="schedule" />
            <span>{t('sampleExam')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6" className={reportsActive}>
          <Link to="/reports">
            <Icon type="trophy" />
            <span>{t('reports')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="13" className={statisticalActive}>
          <Link to="/statistical">
            <Icon type="line-chart" />
            <span>{t('statistical')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="12" className={companyManagementActive}>
          <Link to="/companies">
            <Icon type="bank" />
            <span>{t('company')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7" className={usersManagementActive}>
          <Link to="/users-management">
            <Icon type="team" />
            <span>{t('users')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="8" className={categorytActive}>
          <Link to="/category">
            <Icon type="folder" />
            <span>{t('category')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="9" className={articlesActive}>
          <Link to="/articles">
            <Icon type="read" />
            <span>{t('articles')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="10" className={slidesActive}>
          <Link to="/slides">
            <Icon type="sliders" />
            <span>Slide</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="11" className={contactsActive}>
          <Link to="/contacts">
            <Icon type="contacts" />
            <span>{t('contacts')}</span>
          </Link>
        </Menu.Item>
      </Menu>
    );

    const sidebarForManager = (
      <Menu theme="dark" mode="inline" className={styles.sidebarLayoutAdmin}>
        <Menu.Item key="1" className={homeActive}>
          <Link to="/home">
            <Icon type="home" />
            <span>{t('home')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3" className={testManagementActive}>
          <Link to="/exam-questions">
            <Icon type="database" />
            <span>{t('examQuestions')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4" className={examQuestionScoreActive}>
          <Link to="/exam-question-scores">
            <Icon type="file-done" />
            <span>{t('scoreMapping')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5" className={examScheduleActive}>
          <Link to="/exam-schedules">
            <Icon type="schedule" />
            <span>{t('examSchedule')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6" className={reportsActive}>
          <Link to="/reports">
            <Icon type="trophy" />
            <span>{t('reports')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7" className={statisticalActive}>
          <Link to="/statistical">
            <Icon type="line-chart" />
            <span>{t('statistical')}</span>
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <Sider
        id="sidebar-layout-admin"
        collapsible
        collapsed={collapsed}
        onCollapse={this.props.onCollapse}>
        <div className={styles.logo}>
          <Link to="/"> 
            {collapsed ? <span className={styles.title}>T</span> : <span className={styles.title}>ENGLISH CENTER</span>}
          </Link>
        </div>
        {userInfo.user.role.name === "Admin" && sidebarForAdmin}
        {userInfo.user.role.name === "Manager" && sidebarForManager}
      </Sider>
    )
  }
}

SideBarLayout.propTypes = {
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func
}

SideBarLayout.defaultProps = {
  collapsed: false
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo
});

export default connect(mapStateToProps, null)(withTranslation()(SideBarLayout));