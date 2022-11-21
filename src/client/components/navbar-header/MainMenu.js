import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MainMenu.module.css';
import { Menu } from 'antd';
import { getActiveClass } from '../../../shared/utils';
import { withTranslation } from 'react-i18next';

class MainMenu extends Component {
  render() {
    const { isAuthenticated, t } = this.props;
    let currentPathName = window.location.pathname;
    const classActive = "ant-menu-item-selected";

    const practiceTestActive = currentPathName.match(/^\/practice-test|preview-exam|view-exam/) ? classActive : ""; 
    const sampleQuestionsActive = currentPathName.match(/^\/sample-exams|preview-sample-exam|view-sample-exam/) ? classActive : ""; 
    const scoreAndCerfActive = getActiveClass(currentPathName, "/score-and-cerf");
    const tipsActive = currentPathName.match(/^\/tips/) ? classActive : ""; 
    const contactActive = getActiveClass(currentPathName, "/contact");

    return (
      <Menu mode={this.props.mode} className={`${styles.mainMenu} main-menu-header`}>
        {
          isAuthenticated &&
          <Menu.Item key="1" className={practiceTestActive}>
            <Link to="/practice-test">{t('practiceTest')}</Link>
          </Menu.Item>
        }
        {
          isAuthenticated &&
          <Menu.Item key="2" className={sampleQuestionsActive}>
            <Link to="/sample-exams">{t('sampleExams')}</Link>
          </Menu.Item>
        }

        <Menu.Item key="3" className={scoreAndCerfActive}>
          <Link to="/score-and-cerf">{t('scoreAndCerf')}</Link>
        </Menu.Item>
        <Menu.Item key="4" className={tipsActive}>
          <Link to="/tips">{t('tips')}</Link>
        </Menu.Item>
        <Menu.Item key="contact" className={contactActive}>
          <Link to="/contact">{t('contact')}</Link>
        </Menu.Item> 
      </Menu>
    );
  }
}

export default withTranslation()(MainMenu);