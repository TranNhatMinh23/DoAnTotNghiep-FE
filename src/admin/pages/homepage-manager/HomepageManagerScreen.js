import React, { Component, Fragment } from 'react'; 
import WidgetPage from '../../components/common/widget-page/WidgetPage';
import { Card, Icon } from 'antd';
import PropTypes  from 'prop-types';
import styles from './HomepageManager.module.css';
import { withTranslation } from 'react-i18next';

class HomepageScreen extends Component {
  render() { 
    const { mainInfo, t } = this.props; 
    
    return (
      <Fragment> 
        <WidgetPage>
          <p className="title-widget">{t('generalManagement')}</p>
          <div className="row">
          <div className="col-sm-6 col-md-3">
            <Card className="cardItem" title={t('examSchedule')} extra={<Icon type="file-done" />} bordered>
              <p>{t('thereTotal')}: <span>{mainInfo.exams && mainInfo.exams.total}</span></p>
              <p><Icon type="alert" className="active-alert" />&nbsp;{t('onGoing')}: <span>{mainInfo.exams && mainInfo.exams.active}</span></p>
              <p><Icon type="stop" className="block-alert" />&nbsp;{t('stop')}: <span>{mainInfo.exams && mainInfo.exams.block}</span></p>
              <p className={styles.linkDetail}><a href="/admin/exam-schedules" >{t('view')} <Icon type="arrow-right" /></a></p>
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
    exams: {
      total: 0,
      active: 0,
      block: 0
    },
    examQuestions: 0
  }
}

export default withTranslation()(HomepageScreen);