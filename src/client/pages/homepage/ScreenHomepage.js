import React, { Component } from 'react';
import styles from './ScreenHomepage.module.css';
import ListNotification from './list-notification/ListNotification';
import ListNews from './list-news/ListNews';
import { withTranslation } from 'react-i18next';

class ScreenHomepage extends Component {
  render() {
    const { mainInfo, t } = this.props; 
    return (
      <section>
        <div className={`container ${styles.content}`}> 
          <div className="row">
            <div className={`col-md-6 ${styles.widgetContent}`}>
              <p><i className="fa fa-bullhorn"></i>{t('notifications')}</p>
              <ListNotification notifications={mainInfo.notifications} />
            </div>
            <div className={`col-md-6 ${styles.widgetContent}`}>
              <p><i className="fa fa-newspaper-o"></i>{t('news')}</p>
              <ListNews news={mainInfo.news} />
            </div>
          </div>
        </div>
      </section >
    );
  }
}

export default withTranslation()(ScreenHomepage);