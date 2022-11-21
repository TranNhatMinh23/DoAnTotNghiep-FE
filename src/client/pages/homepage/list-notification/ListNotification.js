import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemNotification from '../item-notification/ItemNotification';
import styles from './ListNotification.module.css';
import { Icon } from 'antd';
import { withTranslation } from 'react-i18next';

class ListNotification extends Component {
  render() {
    const { notifications, t } = this.props;
    return (
      <div> 
        {notifications && notifications.data.map((noti) => {
          return <ItemNotification key={noti.id} noti={noti} />
        })}
        {
          notifications.data.length > 0 &&
          <p className={styles.viewmore}>
            <Link to={`/view-all?type=notifications`}>{t('seeAll')}<Icon type="arrow-right" /></Link>
          </p>
        }
      </div>
    );
  }
}

export default withTranslation()(ListNotification);