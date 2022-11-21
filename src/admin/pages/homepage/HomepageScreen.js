import React, { Component, Fragment } from 'react';
import WidgetPage from '../../components/common/widget-page/WidgetPage';
import { Card, Icon } from 'antd';
import PropTypes  from 'prop-types';
import styles from './Homepage.module.css'; 
import { withTranslation } from 'react-i18next';

class HomepageScreen extends Component {
  render() {
    const { mainInfo, t } = this.props; 
    
    return (
      <Fragment>
        <WidgetPage>
          <p className="title-widget">{t('home')}</p> 
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('contacts')} extra={<Icon type="mail" />} bordered>
                <p><Icon type="question-circle" className="pendding-icon" />&nbsp;{t('thereTotal')} <span>{mainInfo.contacts && mainInfo.contacts.pendding}</span> {t('newContactRequest')}</p>
                <p><Icon type="check-square" className="processed-icon" />&nbsp;<span>{mainInfo.contacts && mainInfo.contacts.processed}</span> {t('processedContacts')}</p>
                <p className={styles.linkDetail}><a href="/admin/contacts" >{t('detail')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('company')} extra={<Icon type="bank" />} bordered>
                <p>{t('thereTotal')}: <span>{mainInfo.companies && mainInfo.companies}</span></p>
                <p className={styles.linkDetail}><a href="/admin/companies" >{t('detail')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('users')} extra={<Icon type="usergroup-add" />} bordered>
                <p>{t('thereTotal')}: <span>{mainInfo.users && mainInfo.users.total}</span></p>
                <p><Icon type="alert" className="active-alert" />&nbsp;{t('active')}: <span>{mainInfo.users && mainInfo.users.active}</span></p>
                <p><Icon type="stop" className="block-alert" />&nbsp;{t('block')}: <span>{mainInfo.users && mainInfo.users.block}</span></p>
                <p className={styles.linkDetail}><a href="/admin/users-management" >{t('detail')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('articles')} extra={<Icon type="folder-open" />} bordered>
                <p>{t('thereTotal')}: <span>{mainInfo.articles && mainInfo.articles.total}</span></p>
                <p><Icon type="alert" className="active-alert" />&nbsp;{t('active')}: <span>{mainInfo.articles && mainInfo.articles.active}</span></p>
                <p><Icon type="stop" className="block-alert" />&nbsp;{t('block')}: <span>{mainInfo.articles && mainInfo.articles.block}</span></p>
                <p className={styles.linkDetail}><a href="/admin/articles" >{t('detail')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
          </div>
        </WidgetPage>
        <WidgetPage borderTopColor="#008B8B">
          <p className="title-widget">{t('generalManagement')}</p>
          <div className="row">
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('sampleExam')} extra={<Icon type="file-done" />} bordered>
                <p>{t('thereTotal')}: <span>{mainInfo.sampleExam && mainInfo.sampleExam.total}</span></p>
                <p><Icon type="alert" className="active-alert" />&nbsp;{t('onGoing')}: <span>{mainInfo.sampleExam && mainInfo.sampleExam.active}</span></p>
                <p><Icon type="stop" className="block-alert" />&nbsp;{t('stop')}: <span>{mainInfo.sampleExam && mainInfo.sampleExam.block}</span></p>
                <p className={styles.linkDetail}><a href="/admin/contacts" >{t('view')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
            <div className="col-sm-6 col-md-3">
              <Card className="cardItem" title={t('examQuestions')} extra={<Icon type="database" />} bordered>
                <p>{t('thereTotal')}: <span>{mainInfo.examQuestions}</span></p>
                <p className={styles.linkDetail}><a href="/admin/exam-questions" >{t('view')} <Icon type="arrow-right" /></a></p>
              </Card>
            </div>
          </div>
        </WidgetPage>
      </Fragment>
    );
  }
}

HomepageScreen.propTypes = {
  mainInfo: PropTypes.object 
}

HomepageScreen.defaultProps = { 
  mainInfo: {
    contacts: {
      pendding: 0,
      processed: 0
    },
    companies: 0,
    users: {
      total: 0,
      active: 0,
      block: 0
    },
    articles: {
      total: 0,
      active: 0,
      block: 0
    },
    sampleExam: {
      total: 0,
      active: 0,
      block: 0
    },
    examQuestions: 0
  }
}

export default withTranslation()(HomepageScreen); 