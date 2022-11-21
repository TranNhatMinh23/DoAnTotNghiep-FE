import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './MyProfile.module.css';
import SecurityInfomation from '../detail/security-infomation/SecurityInfomation';
import PersonalInfomation from '../detail/personal-information/PersonalInfomation';
import { PageHeader, Tabs } from 'antd';
import Avatar from '../detail/avatar/Avatar';
import { withTranslation } from 'react-i18next';

const { TabPane } = Tabs;

class MyProfile extends Component {

  changeTabsProfile = (key) => {
    localStorage.setItem("idTabsProfile", key);
  }

  render() {
    const idTabs = localStorage.getItem("idTabsProfile") ? localStorage.getItem("idTabsProfile") : '1';
    const { userInfo, t } = this.props;
    return (
      <DocumentTitle title='Profile'>
        <section className={styles.myProfile}>
          <PageHeader className="page-header-custom" onBack={() => window.history.back()} title={t('myProfile')}/>
          <div className={`row ${styles.widgetProfile}`}>
            <div className="col-md-4">
              <Avatar userInfo={userInfo.user} />
            </div>
            <div className="col-md-8">
              <Tabs defaultActiveKey={idTabs} className="tabs-custom" onChange={this.changeTabsProfile}>
                <TabPane tab={t('basicInfo')} key="1">
                  <PersonalInfomation userInfo={userInfo.user} />
                </TabPane>
                <TabPane tab={t('securityInfo')} key="2">
                  <SecurityInfomation userInfo={userInfo.user} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
      </DocumentTitle>
    );
  }
}

MyProfile.propTypes = {
  userInfo: PropTypes.object
}

MyProfile.defaultProps = {
  userInfo: {
    user: ''
  }
}

const mapStateToProps = state => ({
  userInfo: state.authReducer.userInfo,
  isLoading: state.authReducer.isLoading,
  err: state.authReducer.err,
  message: state.authReducer.message,
});

export default connect(mapStateToProps, null)(withTranslation()(MyProfile));