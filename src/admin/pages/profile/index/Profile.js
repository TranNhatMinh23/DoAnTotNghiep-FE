import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../../components/loading/Loading';
import { Tabs } from 'antd';
import AccountInfomation from '../detail/account-information/AccountInfomation';
import SecurityInfomation from '../detail/security-infomation/SecurityInfomation';
import WidgetPage from '../../../components/common/widget-page/WidgetPage';
import { withTranslation } from 'react-i18next';
import CompanyInfomation from '../detail/company-information/CompanyInfomation';

const { TabPane } = Tabs;

class Profile extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)
  }

  changeTabsProfile = (key) => {
    localStorage.setItem("idTabsProfileAdmin", key);
  }

  render() {
    const { userInfo, t } = this.props;
    const idTabs = localStorage.getItem("idTabsProfileAdmin") ? localStorage.getItem("idTabsProfileAdmin") : '1';

    if (this.state.loading === false) {
      return (
        <DocumentTitle title={`Administrator - ${t('myProfile')} `}>
          <WidgetPage>
            <Tabs defaultActiveKey={idTabs} className="tabs-custom" onChange={this.changeTabsProfile} tabPosition="top" >
              <TabPane tab={t('personalInfo')} key="1">
                <AccountInfomation userInfo={userInfo.user} />
              </TabPane>
              <TabPane tab={t('companyInfo')} key="2">
                <CompanyInfomation userInfo={userInfo.user} />
              </TabPane>
              <TabPane tab={t('securityInfo')} key="3">
                <SecurityInfomation userInfo={userInfo.user} />
              </TabPane>
            </Tabs>
          </WidgetPage>
        </DocumentTitle>
      )
    }

    return (
      <Loading isLoading={this.state.loading} />
    );
  }
}

Profile.propTypes = {
  userInfo: PropTypes.object
}

Profile.defaultProps = {
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

export default connect(mapStateToProps, null)(withTranslation()(Profile));