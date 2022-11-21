import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ItemNotification.module.css';
import moment from 'moment';
import { checkIsNew, limitText } from '../../../../shared/function';
import { withTranslation } from 'react-i18next';

const dateCheck = "DD/MM/YYYY HH:mm:ss";

class ItemNotification extends Component {
  render() {
    const { noti, t } = this.props;
    return (
      <div className={styles.wdNotify}> 
        <div className={styles.calendar}>
          <span className={styles.year}>{moment(noti.created_at).format("YYYY")}</span>
          <span className={styles.month}>{moment(noti.created_at).format("MM")}</span>
          <span className={styles.date}>{moment(noti.created_at).format("DD")}</span>
        </div>
        <div className={styles.wdNotifyRight}>
          <Link to={`/view-detail-article?id=${noti.id}`}>
            <p className="title-with-notify">{limitText(noti.title, 20)}</p>
            {checkIsNew(moment().format(dateCheck), moment(noti.created_at).format(dateCheck)) && <span className="wd-notify wd-notify-new">{t('new')}</span>} 
          </Link>
          <p className={styles.time}>
            <i className="fa fa-calendar"></i>&nbsp;{moment(noti.created_at).format("DD-MM-YYYY HH:mm:ss")}
          </p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ItemNotification);